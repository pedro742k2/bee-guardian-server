import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

const { verifyHiveAccess } = require("../Validations/verifyHiveAccess");

export const handleAddHiveNote =
  (db: Knex) => async (req: IReq, res: Response) => {
    const { user_id } = req.user;
    const { hive_id, note } = req.body;

    if (!note.trim())
      return res.status(400).json({ error: "Empty note not added." });

    const isHiveAssociated = await verifyHiveAccess(db, user_id, hive_id);
    const { access, message, httpCode } = isHiveAssociated;

    if (!access) return res.status(httpCode).json({ error: message });

    return db
      .transaction((trx) =>
        trx("hive_notes")
          .select("note_id")
          .where({ hive_id, note })
          .then((note_id) => {
            if (note_id[0])
              return res
                .status(400)
                .json({ error: "This note already exists." });

            return trx("login")
              .join("users", "login.username", "users.username")
              .select("users.name")
              .where({ user_id })
              .then((name) => {
                return trx("hive_notes")
                  .insert({
                    hive_id,
                    note,
                    added_by: name[0]?.name,
                    added_date: new Date().toISOString(),
                  })
                  .returning("note")
                  .then((data) => res.json(data))
                  .catch(() =>
                    res.status(500).json({ error: "Internal Server Error" })
                  );
              })
              .catch();
          })
          .then(trx.commit)
          .catch(trx.rollback)
      )
      .catch(() => {
        return res.status(500).json({ error: "Internal Server Error" });
      });
  };
