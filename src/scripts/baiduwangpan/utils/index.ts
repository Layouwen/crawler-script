import fs from "fs";
import { ListItem } from "../../../api/baiduwangpan";
import {
  configPath,
  dataPath,
  defaultOutputDirPath,
  getObsidianDataPath,
} from "../paths";

interface Config {
  cookie?: string;
  outputDirPath: string;
}

export function isNumber(v: string | number) {
  return !isNaN(Number(v));
}

export function getConfigJson() {
  return JSON.parse(fs.readFileSync(configPath).toString()) as Config;
}

export function setConfigJson(data: Record<string, any>) {
  fs.writeFileSync(configPath, JSON.stringify(data));
}

export function getDataJson() {
  return JSON.parse(fs.readFileSync(dataPath).toString()) as ListItem[];
}

export function setDataJson(list: ListItem[]) {
  fs.writeFileSync(dataPath, JSON.stringify(list));
}

export function setObsidianDataJson(v: string) {
  const { outputDirPath } = getConfigJson();
  fs.writeFileSync(getObsidianDataPath(outputDirPath || defaultOutputDirPath), v);
}
