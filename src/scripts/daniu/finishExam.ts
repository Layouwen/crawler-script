import {
  addAnswerSheet,
  getErrorTopicAnalysisPageList,
  getExamPaperTopicPageList,
} from "../../api/daniu";
import logs from "./logs";

export default async ({ subjectName = "", sheet_id = "", paper_id = "" }) => {
  let data;
  if (sheet_id) {
    try {
      data = await getErrorTopicAnalysisPageList(sheet_id);
    } catch (e) {}
  }
  if (paper_id) {
    try {
      data = await getExamPaperTopicPageList(paper_id);
    } catch (e) {}
  }
  if (data?.list) {
    const { list } = data;
    const item_list = list.map((l) => {
      return {
        exam_topic_id: l.exam_topic_id,
        stu_answer: ["A"],
        paper_topic_id: l.paper_topic_id,
      };
    });
    try {
      await addAnswerSheet({ paper_id, item_list });
      logs.info(`提交答案成功 ${subjectName} ${paper_id} ${sheet_id}`);
    } catch (e) {
      logs.error(`提交答案失败 ${subjectName} ${paper_id} ${sheet_id}`);
    }
  }
};
