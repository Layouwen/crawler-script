import {
  outputDirPath,
  outputDaNiuDirPath,
  logsDirPath,
  outputKongGeDirPath,
} from "../config";
import { createDir } from "./index";

const paths = [
  logsDirPath,
  // 根目录
  outputDirPath,
  // 大牛
  outputDaNiuDirPath,
  // 空格
  outputKongGeDirPath,
];

export const initAllDir = () => {
  paths.forEach((path) => createDir(path));
};
