import fs from "fs";
import c from "picocolors";
import { baseDirPath, configPath, defaultOutputDirPath } from "./paths";
import {
  fetchDataFromDir,
  findDiscontinuous,
  findFiles,
  genObsidianData,
  setCookieFromInput,
} from "./funs";
import inquirer from "inquirer";
import { getConfigJson } from "./utils";

enum Options {
  SET_COOKIE = "设置Cookie",
  GET_CONFIG = "获取配置",
  FETCH = "获取数据",
  FIND = "查找文件",
  GEN_OBSIDIAN = "生成obsidian数据",
  DISCONTINUOUS = "查找断点及未命名文件",
  RESET_CONFIG = "重置Config",
  EXIT = "退出",
}

const inquireStart = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "option",
      choices: [
        Options.SET_COOKIE,
        Options.GET_CONFIG,
        Options.FETCH,
        Options.FIND,
        Options.GEN_OBSIDIAN,
        Options.DISCONTINUOUS,
        Options.RESET_CONFIG,
        Options.EXIT,
      ],
      message: "功能",
    },
  ]);
};

const defaultConfig = {
  cookie: "",
  outputDirPath: defaultOutputDirPath,
};

const init = () => {
  const paths = [baseDirPath, defaultOutputDirPath];
  for (const p of paths) {
    if (!fs.existsSync(p)) {
      fs.mkdirSync(p);
    }
  }

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
  }
};

!(async () => {
  init();

  let option: Options;
  do {
    const answer = await inquireStart();
    option = answer.option;
    switch (option) {
      case Options.SET_COOKIE:
        await setCookieFromInput();
        console.log(c.green("设置成功"));
        break;
      case Options.GET_CONFIG:
        console.log(getConfigJson());
        console.log(c.green("获取配置"));
        break;
      case Options.FETCH:
        await fetchDataFromDir();
        console.log(c.green("数据更新完成"));
        break;
      case Options.FIND:
        await findFiles();
        console.log(c.green("查找完成"));
        break;
      case Options.GEN_OBSIDIAN:
        genObsidianData();
        console.log(c.green("生成完成"));
        break;
      case Options.DISCONTINUOUS:
        findDiscontinuous();
        console.log(c.green("查找完成"));
        break;
      case Options.RESET_CONFIG:
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
        console.log(c.green("重置Config完成"));
        break;
      case Options.EXIT:
        console.log(c.red("退出程序......"));
        break;
    }
  } while (option !== Options.EXIT);
})();
