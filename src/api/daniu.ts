import axios from 'axios';
import config from '../config';

const request = axios.create({headers: {authorization: `Bearer ${config.daniu.token}`}});

request.interceptors.response.use((res) => res.data);

export const getExamPaperPageList = async () => {
  const res = await request.get('https://ios.api.daniujiaoyu.org/pc/api/pcweb/exampaper/getexampaperpagelist', {
    params: {
      page: 1,
      limit: 999,
      subject_id: config.daniu.subject_id,
      plate: 801,
    },
  });
  return res.data.list as {
    name: string;
    sheet_id: string
  }[];
};

export const getErrorTopicAnalysisPageList = async (sheet_id: string) => {
  const res = await request.get('https://ios.api.daniujiaoyu.org/pc/api/pcweb/answersheet/geterrortopicanalysispagelist', {
      params: {
        page: 1,
        limit: 9999,
        sheet_id,
        analysis_type: 2,
      },
    },
  );
  return res.data as {
    paper: {
      name: string
    },
    list: AAA[]
  };
};

export const getExamPaperPageList2 = async () => {
  const res = await request.get('https://ios.api.daniujiaoyu.org/pc/api/pcweb/exampaper/getexampaperpagelist', {
    params: {
      page: 1,
      limit: 9999,
      subject_id: config.daniu.subject_id,
      plate: 802,
    },
  }) as {
    data: {
      list: {
        name: string;
        paper_id: string;
      }[];
    }
  };
  return res.data.list;
};

export const getExamPaperTopicPageList = async (paper_id: string) => {
  const res = await request.get('https://ios.api.daniujiaoyu.org/pc/api/pcweb/exampaper/getexampapertopicpagelist', {
    params: {
      page: 1,
      limit: 9999,
      paper_id,
    },
  }) as {
    data: {
      paper: {
        name: string;
      },
      list: AAA[]
    }
  };
  return res.data as {
    paper: {
      name: string
    },
    list: AAA[]
  };
};

export default request;

export enum CategoryName {
  CHOICE1 = '单项选择题',
  CHOICE2 = '单选题',
  MORE_CHOICE = '多选题',
  SUBJECTIVE = '主观题',
  SHORT_ANSWER = '简答题',
  DISCUSS = '论述题'
}

export interface AAA {
  category_name: CategoryName;
  topic_no: string;
  topic_title: string;
  answer: string;
  itemList: {}[];
  analysis: string;
}
