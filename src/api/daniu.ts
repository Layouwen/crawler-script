import axios from "axios";
import config from "../config";

const request = axios.create({
  headers: { authorization: `Bearer ${config.daniu.token}` },
});

request.interceptors.response.use((res) => res.data);

export const getStudentTopicSubject = async () => {
  const res = await request.get(
    "https://ios.api.daniujiaoyu.org/pc/api/pcweb/subjectcategory/getstudenttopicsubject"
  );
  return res.data[0].subject_list;
};

export const getExamPaperPageList = async (subjectId: string) => {
  const res = await request.get(
    "https://ios.api.daniujiaoyu.org/pc/api/pcweb/exampaper/getexampaperpagelist",
    {
      params: {
        page: 1,
        limit: 999,
        subject_id: subjectId,
        plate: 801,
      },
    }
  );
  return res.data.list as {
    name: string;
    sheet_id: string;
    done_count: number;
  }[];
};

export const getErrorTopicAnalysisPageList = async (sheet_id: string) => {
  const res = await request.get(
    "https://ios.api.daniujiaoyu.org/pc/api/pcweb/answersheet/geterrortopicanalysispagelist",
    {
      params: {
        page: 1,
        limit: 9999,
        sheet_id,
        analysis_type: 2,
      },
    }
  );
  return res.data as {
    paper: {
      name: string;
    };
    list: AAA[];
  };
};

export const getExamPaperPageList2 = async (subjectId: string) => {
  const res = (await request.get(
    "https://ios.api.daniujiaoyu.org/pc/api/pcweb/exampaper/getexampaperpagelist",
    {
      params: {
        page: 1,
        limit: 9999,
        subject_id: subjectId,
        plate: 802,
      },
    }
  )) as {
    data: {
      list: {
        name: string;
        paper_id: string;
        done_count: number;
      }[];
    };
  };
  return res.data.list;
};

export const getExamPaperTopicPageList = async (paper_id: string) => {
  const res = (await request.get(
    "https://ios.api.daniujiaoyu.org/pc/api/pcweb/exampaper/getexampapertopicpagelist",
    {
      params: {
        page: 1,
        limit: 9999,
        paper_id,
      },
    }
  )) as {
    data: {
      paper: {
        name: string;
      };
      list: AAA[];
    };
  };
  return res.data as {
    paper: {
      name: string;
    };
    list: AAA[];
  };
};

export const addAnswerSheet = (data: {
  paper_id: string;
  item_list: {
    exam_topic_id: string;
    stu_answer: string[];
    paper_topic_id: string;
  }[];
}) => {
  return request.post(
    "https://ios.api.daniujiaoyu.org/pc/api/pcweb/answersheet/addanswersheet",
    {
      state: 1,
      expand_second: 10,
      last_topic_no: 0,
      ...data,
    }
  );
};

export default request;

export enum CategoryName {
  CHOICE1 = "单项选择题",
  CHOICE2 = "单选题",
  CHOICE3 = "单选",
  MORE_CHOICE1 = "多选题",
  MORE_CHOICE2 = "多选",
  SUBJECTIVE = "主观题",
  SHORT_ANSWER = "简答题",
  DISCUSS = "论述题",
}

export interface AAA {
  category_name: CategoryName;
  topic_no: string;
  topic_title: string;
  answer: string;
  itemList: {}[];
  analysis: string;
  exam_topic_id: string;
  paper_topic_id: string;
}
