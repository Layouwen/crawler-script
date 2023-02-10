import os from "os";
import path from "path";

const homedir = os.homedir();
export const baseDirPath = path.join(homedir, "crawler-script");
export const defaultOutputDirPath = path.join(baseDirPath, "output");

export const configPath = path.join(baseDirPath, "config.json");
export const dataPath = path.join(baseDirPath, "file_data.json");
export const getObsidianDataPath = (outputPath = defaultOutputDirPath) => {
  return path.join(outputPath, "obsidian_data.txt");
};
