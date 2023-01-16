import { resolve } from "path";

export const nextDir = (path: string, dirName: string) => {
  return resolve(path, dirName);
};

export const getOutputOrganizationPath = (name: string) => {
  return resolve(outputDirPath, `${name}`);
};

export const getOutputSubjectPath = (name: string, subjectName: string) => {
  return resolve(getOutputOrganizationPath(name), `${subjectName}`);
};

// base dir
export const outputDirPath = resolve(__dirname, "../../output");
export const logsDirPath = resolve(__dirname, "../../logs");
export const logsDaNiuDirPath = nextDir(logsDirPath, "大牛教育");

// category dir
export const outputDaNiuDirPath = getOutputOrganizationPath("大牛教育");
export const outputKongGeDirPath = getOutputOrganizationPath("空格教育");
