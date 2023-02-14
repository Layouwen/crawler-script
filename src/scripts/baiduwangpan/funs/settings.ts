import fs from "fs";
import inquirer from "inquirer";
import c from "picocolors";
import { defaultConfig } from "../config";
import { configPath } from "../paths";
import { getConfigJson, setAlias } from "../utils";
import { setCookieFromInput } from "./setCookie";

enum SettingOptions {
  GET_CONFIG = "获取配置",
  SET_COOKIE = "设置Cookie",
  RESET_CONFIG = "重置Config",
  SET_ALIAS = "设置别名",
  BACK = "返回",
}

function settingSelect() {
  return inquirer.prompt([
    {
      type: "list",
      name: "settingOption",
      choices: [
        SettingOptions.GET_CONFIG,
        SettingOptions.SET_COOKIE,
        SettingOptions.RESET_CONFIG,
        SettingOptions.SET_ALIAS,
        SettingOptions.BACK,
      ],
      message: "功能",
    },
  ]);
}

function getAliasAndPathInquirer() {
  return inquirer.prompt([
    {
      type: "input",
      name: "path",
      message: "请输入路径",
    },
    {
      type: "input",
      name: "alias",
      message: "请输入别名，不需要添加 @",
    },
  ]);
}

export async function openSettings() {
  const { settingOption } = await settingSelect();
  switch (settingOption) {
    case SettingOptions.SET_COOKIE:
      await setCookieFromInput();
      console.log(c.green("设置成功"));
      break;
    case SettingOptions.GET_CONFIG:
      console.log(getConfigJson());
      console.log(c.green("获取配置"));
      break;
    case SettingOptions.RESET_CONFIG:
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
      console.log(c.green("重置Config完成"));
      break;
    case SettingOptions.SET_ALIAS:
      const { alias, path } = await getAliasAndPathInquirer();
      setAlias(path, alias);
      console.log(c.green("别名设置成功，查找时以@开头"));
      break;
    case SettingOptions.BACK:
      console.log(c.green("返回上一层"));
      break;
  }
}
