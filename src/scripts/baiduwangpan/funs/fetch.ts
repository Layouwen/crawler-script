import inquirer from "inquirer";
import c from "picocolors";
import { getListApi, ListItem } from "../../../api/baiduwangpan";
import { getAliasPath, getConfigJson, setDataJson } from "../utils";

function getNames(list: ListItem[]) {
  return list.map(({ server_filename, isdir, path }) => ({
    server_filename,
    isdir,
    path,
  }));
}

async function getDirInquire() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "dir",
      message: "输入目录",
    },
  ]);
  return answer.dir as string;
}

export async function fetchDataFromDir() {
  const { cookie } = getConfigJson();
  if (!cookie) {
    console.log(c.red("请先设置cookie"));
    return;
  }
  let dir = await getDirInquire();

  if (dir.startsWith("@")) {
    const aliasPath = getAliasPath(dir.slice(1));
    if (aliasPath) {
      dir = aliasPath;
      console.log(c.green(`别名解析完成：${aliasPath}`));
    }
  }

  const { data: listData } = await getListApi({
    dir,
    num: 500,
    page: 1,
  });
  const { list } = listData;
  const names = getNames(list);
  setDataJson(names);
}
