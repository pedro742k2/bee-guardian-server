import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

export const handleAddHive = (db: Knex) => (req: IReq, res: Response) => {
  const { hive_id, hive_details } = req.body;
  const { user_id } = req.user;

  /* Funcionamento:
  Verificar se colmeia já foi adicionada (em "hives")
    Se sim:
      Verificar se descrição ("hives.hive_details") é igual a ("req.body.hive_details")
        Se sim:
          TENTAR inserir colmeia (em "user_hives")
            Se conseguir: RETORNA -> "Colmeia adicionada"
            Se não conseguir: RETORNA -> "Esta comleia já está adicionada"
        Se não:
          Atualizar descrição (em "hives")
          TENTAR inserir colmeia (em "user_hives")
            Se conseguir: RETORNA -> "Colmeia adicionada e descrição atualizada"
            Se não conseguir: RETORNA -> "Descrição atualizada"
    Se não:
      Inserir colmeia (em "hives")
      Inserir colmeia (em "user_hives")
      RETORNA -> "Colmeia adicionada"
  */

  return db.transaction((trx) =>
    trx("hives")
      .select("hive_id", "hive_details")
      .where({ hive_id })
      .then((data) => {
        if (!data[0])
          return trx("hives")
            .insert({
              hive_id,
              hive_details,
              add_date: new Date(),
            })
            .then(() =>
              trx("user_hives")
                .insert({ hive_id, hive_user_id: user_id })
                .then(() => res.json({ message: "Hive added successfully" }))
            )
            .catch(() =>
              res.status(500).json({ error: "Internal Server Error" })
            );

        if (data[0].hive_details === hive_details)
          return trx("user_hives")
            .select("hive_id")
            .where({
              hive_id,
              hive_user_id: user_id,
            })
            .then((user_hives_id) => {
              if (!user_hives_id[0])
                return trx("user_hives")
                  .insert({ hive_id, hive_user_id: user_id })
                  .then(() => res.json({ message: "Hive added successfully" }))
                  .catch(() =>
                    res.status(500).json({ error: "Internal Server Error" })
                  );

              return res
                .status(400)
                .json({ message: "This hive is already added" });
            })
            .catch(() =>
              res.status(500).json({ error: "Internal Server Error" })
            );

        return trx("hives")
          .update({
            hive_details,
          })
          .where("hive_id", hive_id)
          .then(() =>
            trx("user_hives")
              .select("hive_id")
              .where({
                hive_id,
                hive_user_id: user_id,
              })
              .then((user_hives_id) => {
                if (!user_hives_id[0])
                  return trx("user_hives")
                    .insert({ hive_id, hive_user_id: user_id })
                    .then(() =>
                      res.json({
                        message: "Hive and description added successfully",
                      })
                    )
                    .catch(() =>
                      res.status(500).json({ error: "Internal Server Error" })
                    );

                return res.json({ message: "Description updated" });
              })
              .catch(() => {
                res.status(500).json({ error: "Internal Server Error" });
              })
          );
      })
      .then(trx.commit)
      .catch(trx.rollback)
  );
};
