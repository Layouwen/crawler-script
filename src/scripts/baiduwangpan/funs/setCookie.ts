import inquirer from "inquirer";
import { getConfigJson, setConfigJson } from "../utils";

export function setCookie(cookie: string) {
  const configJson = getConfigJson();
  configJson.cookie = cookie;
  setConfigJson(configJson);
}

export async function setCookieFromInput() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "cookie",
      message: "设置cookie",
    },
  ]);
  setCookie(answer.cookie);
}
