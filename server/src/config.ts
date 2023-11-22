import dotenv from "dotenv";
dotenv.config();

function required(
  key: string, 
  defaultValue: number | undefined = undefined
): string | number {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`key ${key} is undefined`);
  }
  return value;
}

export const config = {
  port: required("PORT", 8080),
};
