import { Response } from "express";
import { Knex } from "knex";
import { IReq } from "src/Types/request";

const { readingsValidation } = require("../Validations/inputSyntax");

export const handleReceiveData = (db: Knex) => (req: IReq, res: Response) => {
  // Argumentos enviados pelo Arduino.
  const {
    hive_id,
    internal_temperature,
    external_temperature,
    humidity,
    weight,
    battery,
    solar_panel_voltage,
  } = req.body;

  const isValid = readingsValidation({
    internal_temperature,
    external_temperature,
    humidity,
    weight,
    battery,
    solar_panel_voltage,
  });

  if (isValid.error)
    return res.status(400).json({
      error: isValid.error.details[0].message,
    });

  return db
    .insert({
      hive_id,
      internal_temperature,
      external_temperature,
      humidity,
      weight,
      battery,
      solar_panel_voltage,
      reading_date: new Date(),
    })
    .into("hive_readings")
    .then(() =>
      res.send({
        success: true,
      })
    )
    .catch((error: Error) => {
      return res.status(500).json({
        error: true,
        errorCode: error,
      });
    });
};
