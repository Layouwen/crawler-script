import fs from "fs";
import c from "picocolors";
import { defaultConfig } from "./config";
import { baseDirPath, configPath, defaultOutputDirPath } from "./paths";
import {
  fetchDataFromDir,
  findDiscontinuous,
  findFiles,
  genObsidianData,
  openSettings,
} from "./funs";
import inquirer from "inquirer";

enum Options {
  FETCH = "获取数据",
  FIND = "查找文件",
  GEN_OBSIDIAN = "生成obsidian数据",
  DISCONTINUOUS = "查找断点及未命名文件",
  SETTINGS = "设置",
  EXIT = "退出",
}

const inquireStart = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "option",
      choices: [
        Options.FETCH,
        Options.FIND,
        Options.GEN_OBSIDIAN,
        Options.DISCONTINUOUS,
        Options.SETTINGS,
        Options.EXIT,
      ],
      message: "功能",
    },
  ]);
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
      case Options.SETTINGS:
        await openSettings();
        break;
      case Options.EXIT:
        console.log(c.red("退出程序......"));
        break;
    }
  } while (option !== Options.EXIT);
})();
