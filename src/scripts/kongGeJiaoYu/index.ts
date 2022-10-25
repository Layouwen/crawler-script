import * as path from 'path';
import * as  fs from 'fs';
import { getHomeworkDetail } from '../../api/kongGeJiaoYu';

const execShortAnswer = (origin: any, hasQueNum = true) => {
  const data = origin.data;
  const homework_name = data.report_base.homework_name;
  const question = data.question;
  const questionStrArr = question.map((q: any, qIndex: number) => {
    const qNum = qIndex + 1;
    const title = q.ques_stem;
    const analysis = q.ques_analysis;

    let outputStr = '';
    if (hasQueNum) {
      outputStr += `${qNum}、`;
    }

    outputStr += `${replaceStr(title)}[简答题]\n`;
    if (analysis) {
      if (!analysis.includes('解析：')) {
        outputStr += '解析：';
      }
      outputStr += `${replaceStr(analysis)}\n`;
    }

    outputStr += '\n';
    return outputStr;
  });

  fs.writeFile(path.resolve(__dirname, `output/${homework_name}.txt`), `${homework_name}\n\n${questionStrArr.join('')}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const execChoice = (origin: any, hasQueNum = true) => {
  const data = origin.data;
  const homework_name = data.report_base.homework_name;
  const question = data.question;
  const questionStrArr = question.map((q: any, qIndex: number) => {
    const qNum = qIndex + 1;
    const rightId = JSON.parse(q.right_answer)[0].id;
    const ques_option = JSON.parse(q.ques_option);
    const rightItem = ques_option.find((i: any) => i.id === rightId);

    const title = q.ques_stem;

    const optionsNum = ['A', 'B', 'C', 'D'];
    const answer = [] as string[];
    const options = ques_option.map((o: any, i: number) => {
      const num = optionsNum[i];
      if (o.id === rightId) {
        answer.push(num);
      }
      return `${num}、${replaceStr(o.content)}`;
    });
    const analysis = q.ques_analysis;

    let outputStr = '';
    if (hasQueNum) {
      outputStr += `${qNum}、`;
    }
    outputStr += `${replaceStr(title)} （${answer.join()}）\n`;
    outputStr += options.join('\n');
    outputStr += '\n';
    if (analysis) {
      if (!analysis.includes('解析：')) {
        outputStr += '解析：';
      }
      outputStr += `${replaceStr(analysis)}\n`;
    }
    outputStr += '\n';
    return `${outputStr}`;
  });

  fs.writeFile(path.resolve(__dirname, `output/${homework_name}.txt`), `${homework_name}\n\n${questionStrArr.join('')}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const replaceStr = (str: string | number) => {
  if (typeof str !== 'string') {
    return str;
  }
  const map = {
    '\n': '',
    '<p>': '',
    '</p>': '',
    ' ': '',
    '&nbsp;': ' ',
  } as any;
  Object.keys(map).forEach((key: string) => {
    str = (str as string).replaceAll(key, map[key]);
  });
  return str;
};

!(async function () {
  const choice = await getHomeworkDetail(1202777);
  const shortAnswer = await getHomeworkDetail(1203023);
  execChoice(choice.data);
  execShortAnswer(shortAnswer.data);
})();
