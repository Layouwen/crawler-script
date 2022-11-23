import fs from "fs";
import logs from "./logs";

export * from "./initDir";

export const createDir = (path: string) => {
  if (!fs.existsSync(path)) {
    logs.error(`不存在 —— ${path} `);
    fs.mkdirSync(path);
    logs.info(`创建 —— ${path}`);
  }
};
