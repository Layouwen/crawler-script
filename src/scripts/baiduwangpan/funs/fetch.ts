import inquirer from "inquirer";
import c from "picocolors";
import { getListApi, ListItem } from "../../../api/baiduwangpan";
import { getConfigJson, setDataJson } from "../utils";

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
  return answer.dir;
}

export async function fetchDataFromDir() {
  const { cookie } = getConfigJson();
  if (!cookie) {
    console.log(c.red("请先设置cookie"));
    return;
  }
  const dir = await getDirInquire();
  const { data: listData } = await getListApi({ dir, num: 500, page: 1 });
  const { list } = listData;
  const names = getNames(list);
  setDataJson(names);
}
