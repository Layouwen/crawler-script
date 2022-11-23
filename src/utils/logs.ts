import c from "picocolors";

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
