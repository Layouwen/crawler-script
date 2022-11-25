import * as fs from "fs";
import { resolve } from "path";
import {
  getExamPaperTopicPageList,
  getExamPaperPageList2,
  getExamPaperPageList,
  getErrorTopicAnalysisPageList,
  AAA,
  CategoryName,
  getStudentTopicSubject,
} from "../../api/daniu";
import { getOutputSubjectPath, nextDir } from "../../config";
import { createDir, createDirFromArr } from "../../utils";
import logs from "./logs";
import * as path from "path";

const organizationName = "大牛教育";

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

const outputList = async ({
  subjectName = "",
  name = "",
  sheet_id = "",
  paper_id = "",
}) => {
  const subjectDir = getOutputSubjectPath(organizationName, subjectName);
  createDir(subjectDir);
  let catePath = "";

  let data;
  if (sheet_id) {
    try {
      catePath = nextDir(subjectDir, "章节练习");
      data = await getErrorTopicAnalysisPageList(sheet_id);
      logs.info(`爬取章节练习成功 ${sheet_id} ${subjectName} ${name}`);
    } catch (e) {
      logs.error(`爬取章节练习失败 ${sheet_id} ${subjectName} ${name}`);
    }
  }
  if (paper_id) {
    try {
      catePath = nextDir(subjectDir, "历史真题");
      data = await getExamPaperTopicPageList(paper_id);
      logs.info(`爬取历史真题成功 ${paper_id} ${subjectName} ${name}`);
    } catch (e) {
      logs.error(`爬取历史真题失败 ${paper_id} ${subjectName} ${name}`);
    }
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
  const subjectList = await getStudentTopicSubject();
  for (const subject of subjectList) {
    const subjectId = subject.subject_id;
    const subjectName = subject.subject_name;

    const paperList = await getExamPaperPageList(subjectId);
    paperList.forEach((p) => {
      void outputList({
        subjectName,
        name: p.name,
        sheet_id: p.sheet_id,
      });
    });
    const data = await getExamPaperPageList2(subjectId);
    data.forEach((p) => {
      void outputList({
        subjectName,
        name: p.name,
        paper_id: p.paper_id,
      });
    });
  }
};
