import { randomInt } from "crypto";

const CHARACTERS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateCode = (length = 7) => {
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(CHARACTERS.length);
    code += CHARACTERS[randomIndex];
  }
  return code;
};
