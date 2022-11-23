import * as fs from "fs";
import { resolve } from "path";
import {
  getExamPaperTopicPageList,
  getExamPaperPageList2,
  getExamPaperPageList,
  getErrorTopicAnalysisPageList,
  AAA,
  CategoryName,
} from "../../api/daniu";
import { getOutputSubjectPath, nextDir } from "../../config";
import { createDirFromArr } from "../../utils";

const organizationName = "大牛教育";
const subjectName = "设计基础";
const subjectDir = getOutputSubjectPath(organizationName, subjectName);
const paths = [subjectDir];

const getTemplate = (data: any, hasNo = false, type = 0) => {
  const { topic_no, topic_title, answer, itemList, analysis } = data;
  if (type === 0) {
    let title = `${topic_title}（${answer.join("").toString()}）\n`;
    if (hasNo) {
      title = `${topic_no}、` + title;
    }
    const items = itemList
      .map(
        (i: { item_no: string; content: string }) =>
          `${i.item_no} ${i.content}\n`
      )
      .join("");
    const bottom = `解析：${analysis}\n`;
    return title + items + bottom;
  } else if (type === 1) {
    let title = `${topic_title}\n`;
    if (hasNo) {
      title = `${topic_no}、` + title;
    }
    const items = itemList
      .map(
        (i: { item_no: string; content: string }) =>
          `${i.item_no} ${i.content}\n`
      )
      .join("");
    const bottom = `答案：${answer.join("").toString()}\n`;
    return title + items + bottom;
  }
};

const outputList = async ({ name = "", sheet_id = "", paper_id = "" }) => {
  let catePath = "";

  let data;
  if (sheet_id) {
    catePath = nextDir(subjectDir, "章节练习");
    data = await getErrorTopicAnalysisPageList(sheet_id);
  }
  if (paper_id) {
    catePath = nextDir(subjectDir, "历史真题");
    data = await getExamPaperTopicPageList(paper_id);
  }
  const choicePath = nextDir(catePath, "选择题");
  const appliedPath = nextDir(catePath, "应用题");
  createDirFromArr([catePath, choicePath, appliedPath]);

  if (data?.list) {
    // 选择题
    generateChoice(choicePath, name, data.list);
    // 简答题
    generateApplied(appliedPath, name, data.list);
  }
  return "success";
};

const generateChoice = (path: string, title: string, list: AAA[]) => {
  const listData = list
    .filter(
      (l) =>
        l.category_name.includes(CategoryName.CHOICE1) ||
        l.category_name.includes(CategoryName.CHOICE2) ||
        l.category_name.includes(CategoryName.MORE_CHOICE)
    )
    .map(({ topic_no, topic_title, answer, itemList, analysis }) => ({
      topic_no,
      topic_title,
      answer,
      itemList,
      analysis,
    }));
  const titleStr = `${title}（选择题）\n\n`;
  const str =
    titleStr + listData.map((l) => getTemplate(l, false, 0)).join("\n");

  fs.writeFile(resolve(path, `${title}.txt`), str, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const generateApplied = (path: string, title: string, list: AAA[]) => {
  const listData = list
    .filter(
      (l) =>
        l.category_name.includes(CategoryName.DISCUSS) ||
        l.category_name.includes(CategoryName.SHORT_ANSWER)
    )
    .map(({ topic_no, topic_title, answer, itemList, analysis }) => ({
      topic_no,
      topic_title,
      answer,
      itemList,
      analysis,
    }));
  const titleStr = `${title}\n\n`;
  const str =
    titleStr + listData.map((l) => getTemplate(l, false, 1)).join("\n");

  fs.writeFile(resolve(path, `${title}.txt`), str, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

export const daniuExec = async () => {
  createDirFromArr(paths);

  const paperList = await getExamPaperPageList();
  paperList.forEach((p) => {
    void outputList({
      name: p.name,
      sheet_id: p.sheet_id,
    });
  });
  const data = await getExamPaperPageList2();
  data.forEach((p) => {
    void outputList({
      name: p.name,
      paper_id: p.paper_id,
    });
  });
};
