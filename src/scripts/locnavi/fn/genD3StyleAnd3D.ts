import axios from "axios";

import path from "path";
import fs from "fs";
import process from "process";

const inputUrl = process.argv[2];

if (!inputUrl) {
  console.log("请输入地址");
  process.exit(0);
}
console.log(inputUrl, "---d3_style.json---");

const outputPath = path.resolve(__dirname, "../output");
const pkgDirPath = path.resolve(outputPath, Date.now() + "");
const d3StylePath = path.resolve(pkgDirPath, "d3_style.json");
const threeDDirPath = path.resolve(pkgDirPath, "3d");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

async function main() {
  const res = await axios.get(inputUrl);

  fs.mkdirSync(pkgDirPath);
  fs.mkdirSync(threeDDirPath);

  const d3StyleJson = res.data;

  fs.writeFileSync(d3StylePath, JSON.stringify(d3StyleJson));

  function save3DModel(url: string, path: string) {
    return axios.get(url, { responseType: "arraybuffer" }).then((res) => {
      fs.writeFileSync(path, res.data);
    });
  }

  const downloadFinishMap = new Map()

  for (const key in d3StyleJson) {
    for (const item of d3StyleJson[key]) {
      for (const model of item.models) {
        const pathArr = model.url.split("/");
        const fileName = `${decodeURI(pathArr[pathArr.length - 1])}`;

        const fileInfo = [
          {
            url: model.url.replace(".draco", ""),
            filename: fileName.replace(".draco", ""),
          },
          {
            url: model.url,
            filename: fileName,
          },
        ];

        for (const item of fileInfo) {
          if (!downloadFinishMap.has(item.filename)) {
          await save3DModel(
            item.url,
            path.resolve(threeDDirPath, item.filename)
          );
          downloadFinishMap.set(item.filename, true)
          console.log(item.filename, item.url, "下载完成");
          }
        }
      }
    }
  }
}

void main();
