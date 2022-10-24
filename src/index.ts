import * as fs from 'fs';
import * as path from 'path';
import config from './config';
import request from './api/daniu';

const outputPath = path.resolve(__dirname, '../output');

enum CategoryName {
  CHOICE = '单项选择题',
  SUBJECTIVE = '主观题'
}

const getExamPaperPageList = async () => {
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

interface AAA {
  category_name: CategoryName;
  topic_no: string;
  topic_title: string;
  answer: string;
  itemList: {}[];
  analysis: string;
}

const getErrorTopicAnalysisPageList = async (sheet_id: string) => {
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

const getTemplate = (data: any, hasNo = false) => {
  const {
    topic_no,
    topic_title,
    answer,
    itemList,
    analysis,
  } = data;
  let title = `${topic_title}（${answer.join('').toString()}）\n`;
  if (hasNo) {
    title = `${topic_no}、` + title;
  }
  const items = itemList.map((i: { item_no: string; content: string; }) => `${i.item_no} ${i.content}\n`).join('');
  const bottom = `解析：${analysis}\n`;
  return title + items + bottom;
};

const outputList = async (name: string, sheet_id: string) => {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  const data = await getErrorTopicAnalysisPageList(sheet_id);

  if (data?.list) {
    generateChoice(name, data.list);
  }
  return 'success';
};

const generateChoice = (title: string, list: AAA[]) => {
  const listData = list
    .filter(l => l.category_name === CategoryName.CHOICE)
    .map(({topic_no, topic_title, answer, itemList, analysis}) => ({
      topic_no,
      topic_title,
      answer,
      itemList,
      analysis,
    }));
  const titleStr = `${title}（选择题）\n\n`;
  const str = titleStr + listData.map(l => getTemplate(l)).join('\n');

  fs.writeFile(path.resolve(outputPath, `${title}.txt`), str, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

!(async function () {
  const paperList = await getExamPaperPageList();
  paperList.forEach(p => {
    void outputList(p.name, p.sheet_id);
  });
})();
