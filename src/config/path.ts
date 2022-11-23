import { resolve } from "path";

export const getOutputOrganizationPath = (name: string) => {
  return resolve(outputDirPath, `${name}`);
};

export const getOutputSubjectPath = (name: string, subjectName: string) => {
  return resolve(getOutputOrganizationPath(name), `${subjectName}`);
};

export const getOutputSubjectChoiceQuestionPath = (
  name: string,
  subjectName: string
) => {
  return resolve(getOutputSubjectPath(name, subjectName), "选择题");
};

export const getOutputSubjectAppliedProblemPath = (
  name: string,
  subjectName: string
) => {
  return resolve(getOutputSubjectPath(name, subjectName), "应用题");
};

// base dir
export const outputDirPath = resolve(__dirname, "../../output");
export const logsDirPath = resolve(__dirname, "../../logs");

// category dir
export const outputDaNiuDirPath = getOutputOrganizationPath("大牛教育");
export const outputKongGeDirPath = getOutputOrganizationPath("空格教育");
