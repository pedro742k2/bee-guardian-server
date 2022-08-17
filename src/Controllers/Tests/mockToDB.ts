import { Request, Response } from "express";
import { Knex } from "knex";

interface IReq extends Request {
  mocks_query: string;
}

export const handleMockToDB = (db: Knex) => (req: IReq, res: Response) => {
  const { mocks_query } = req.body;

  return db.transaction((trx) =>
    trx("hive_readings")
      .truncate()
      .then(() =>
        trx
          .raw(mocks_query)
          .then(() => res.json({ sucess: true }))
          .catch((error) => res.status(500).json({ sucess: false, error }))
      )
      .then(trx.commit)
      .catch(trx.rollback)
  );
};
