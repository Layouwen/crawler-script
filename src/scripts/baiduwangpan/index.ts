import fs from "fs";
import path from "path";
import { getListApi, ListItem } from "../../api/baiduwangpan";

function isNumber(v: string | number) {
  return !isNaN(Number(v));
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

function getNames(list: ListItem[]) {
  return list.map(({ server_filename, isdir, path }) => ({
    server_filename,
    isdir,
    path,
  }));
}

function readFilesData() {
  const data = fs
    .readFileSync(path.join(__dirname, "./file_data.json"))
    .toString();
  return JSON.parse(data) as ListItem[];
}

function saveToFile(list: ListItem[]) {
  fs.writeFileSync(
    path.join(__dirname, "./file_data.json"),
    JSON.stringify(list)
  );
}

function findByNames(name: string) {
  const data = readFilesData();
  return data.filter((file) => {
    return file.server_filename.toLowerCase().includes(name.toLowerCase());
  });
}

function genObsidianData() {
  const data = readFilesData();
  const names = data.map(({ server_filename }) => server_filename);
  const str = names.join("\n\n");
  fs.writeFileSync(path.join(__dirname, "./obsidian_data.txt"), str);
}

!(async () => {
  try {
    const { data: listData } = await getListApi({
      dir: "/01-Video/03-慕课网",
      // dir: "/01-Video/15-开课吧",
      // dir: "/测试",
      num: 500,
      page: 1,
    });

    const { list } = listData;

    // save data to local
    const names = getNames(list);
    saveToFile(names);

    // find discontinuous
    const { lackOrders, unnumbered } = discontinuous(list);
    for (const order of lackOrders) {
      console.log(`你缺少了 ${order}`);
    }
    for (const name of unnumbered) {
      console.log(`你有未命名的文件 ${name}`);
    }

    // find file
    const findData = findByNames("pmp");
    console.log(findData);

    // gen obsidian
    genObsidianData();
  } catch (e) {
    console.log("错误", e);
  }
})();
