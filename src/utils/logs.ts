import c from "picocolors";
import { nextDir } from "../config";
import { createDir, createFileFn } from "./index";

const info = (str: string, ...args: any[]) => {
  console.log(c.green(str), ...args);
};
const error = (str: string, ...args: any[]) => {
  console.log(c.red(str), ...args);
};

export default {
  info,
  error,
};

type Config = {
  path: string;
};

class Logs {
  private readonly path: string;
  private readonly infoFilePath: string;
  private readonly errorFilePath: string;
  private readonly appendInfoFn: (content: string) => void;
  private readonly appendErrorFn: (content: string) => void;
  private flag = true;
  private timer?: NodeJS.Timeout;

  constructor(config: Config) {
    const { path } = config;
    this.path = path;
    this.infoFilePath = nextDir(path, "info.log");
    this.errorFilePath = nextDir(path, "error.log");

    createDir(path);
    this.appendInfoFn = createFileFn(this.infoFilePath);
    this.appendErrorFn = createFileFn(this.errorFilePath);
  }

  private getNowTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours() > 10 ? now.getHours() : `0${now.getHours()}`;
    const min =
      now.getMinutes() > 10 ? now.getMinutes() : `0${now.getMinutes()}`;
    const sec =
      now.getSeconds() > 10 ? now.getSeconds() : `0${now.getSeconds()}`;

    return `${year}-${month}-${date} ${hour}:${min}:${sec}`;
  }

  private group(fn: Function) {
    if (this.flag) {
      fn(this.getNowTime());
      this.flag = false;
    }
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      fn("");
      this.flag = true;
    }, 5000);
  }

  private wrapperHead(content: string) {
    return `[${content}] `;
  }

  public info(content: string) {
    this.group(this.appendInfoFn);
    const s = `${this.wrapperHead(this.getNowTime())}${content}`;
    info(s);
    this.appendInfoFn(s);
  }

  public error(content: string) {
    this.group(this.appendErrorFn);
    const s = `${this.wrapperHead(this.getNowTime())}${content}`;
    error(s);
    this.appendErrorFn(s);
  }
}

export { Logs };
