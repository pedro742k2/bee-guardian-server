import { Request } from "express";

export interface IReq extends Request {
  user: {
    user_id: number;
  };
  body: {
    hive_id: number;
    hive_details: string;
    note: string;
    type: number;
    targetedDate: string;
    user: string;
    password: string;
    internal_temperature: number;
    external_temperature: number;
    humidity: number;
    weight: number;
    battery: number;
    solar_panel_voltage: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    currentPassword: string;
    newPassword: string;
    tare_weight: number;
    newName: string;
    newEmail: string;
    newPhone: string;
  };
}
