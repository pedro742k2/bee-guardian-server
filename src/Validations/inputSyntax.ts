import joi from "joi";

// Readings Constraints
const weightConstraints = joi.number().min(0).required();
const intTempConstraints = joi.number().min(-100).max(100).required();
const extTempConstraints = joi.number().min(-100).max(100).required();
const humidityConstraints = joi.number().min(0).max(100).required();
const batteryConstraints = joi.number().min(0).max(100).required();
const spvConstraints = joi.number().min(0).required();

// User Constraints
const nameConstraint = joi.string().min(1).max(100).required();
const usernameConstraint = joi.string().min(4).max(50).required();
const passwordConstraint = joi.string().alphanum().min(6).required();
const emailConstraint = joi.string().email().required();
const phoneConstraint = joi.string().min(9).max(9).required();

interface IReadingsValidation {
  weight: number;
  internal_temperature: number;
  external_temperature: number;
  humidity: number;
  battery: number;
  solar_panel_voltage: number;
}

interface IUser {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  phone?: string;
}

// Readings Validation
export const readingsValidation = (body: IReadingsValidation) =>
  joi
    .object({
      weight: weightConstraints,
      internal_temperature: intTempConstraints,
      external_temperature: extTempConstraints,
      humidity: humidityConstraints,
      battery: batteryConstraints,
      solar_panel_voltage: spvConstraints,
    })
    .validate(body);

// Register Validation
export const registerValidation = (body: IUser) =>
  joi
    .object({
      name: nameConstraint,
      username: usernameConstraint,
      email: emailConstraint,
      password: passwordConstraint,
      phone: phoneConstraint,
    })
    .validate(body);

// Update Password Validation
export const passwordValidation = (body: IUser) =>
  joi
    .object({
      password: passwordConstraint,
    })
    .validate(body);

// Update User Validation
export const updateUserValidation = (body: IUser) =>
  joi
    .object({
      name: nameConstraint,
      email: emailConstraint,
      phone: phoneConstraint,
    })
    .validate(body);
