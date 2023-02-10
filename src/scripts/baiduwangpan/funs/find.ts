import inquirer from "inquirer";
import c from "picocolors";
import { ListItem } from "../../../api/baiduwangpan";
import { getDataJson, isNumber } from "../utils";

async function findInquire() {
  const answer = await inquirer.prompt([
    {
      type: "input",
      name: "text",
      message: "输入文件名",
    },
  ]);
  return answer.text;
}

function findByNames(name: string) {
  const data = getDataJson();
  return data.filter((file) => {
    return file.server_filename.toLowerCase().includes(name.toLowerCase());
  });
}

export async function findFiles() {
  const text = await findInquire();
  const findData = findByNames(text);
  console.log(JSON.stringify(findData, null, 2));
}

function discontinuous(list: ListItem[]) {
  const result = {
    unnumbered: [] as string[],
    lackOrders: [] as number[],
  };
  let curIndex = 1;

  for (let i = 0; i < list.length; i++) {
    const curItem = list[i];
    const { server_filename: cur_server_filename } = curItem;
    const curOrderName = cur_server_filename.split("-")[0];

    if (isNumber(curOrderName)) {
      const curOrderNameNum = Number(curOrderName);
      if (curOrderNameNum !== curIndex) {
        while (curOrderNameNum > curIndex) {
          result.lackOrders.push(curIndex);
          curIndex++;
        }
      }
      curIndex++;
    } else {
      result.unnumbered.push(cur_server_filename);
    }
  }
  return result;
}

export function findDiscontinuous() {
  const data = getDataJson();
  const { lackOrders, unnumbered } = discontinuous(data);
  for (const order of lackOrders) {
    console.log(c.red(`你缺少了 ${order} 号文件`));
  }
  for (const name of unnumbered) {
    console.log(`
    你有未命名的文件 ${name}`);
  }
}
