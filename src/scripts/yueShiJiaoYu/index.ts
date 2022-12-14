import * as fs from 'fs';
import * as path from 'path';
import {
  getChapterQuestionIdTypesNoLogin,
  getPaperQuestionIdTypes,
  getQuestionListByIdsNoLogin,
} from '../../api/yueShiJiaoYu';

// 科目 id
const subcourseId = '980';

const replaceMap = {
  '<p>': '',
  '</p>': '',
  '<br/>': '',
  '&nbsp;': '',
  '&quot;': '"',
  '<span style="color: #333333; font-family: Microsoft YaHei, Arial, Hiragino Sans GB, WenQuanYi Micro Hei, sans-serif; font-size: 18px; background-color: #FFFFFF;">': '',
  '<span style="color: #333333; background-color: #FFFFFF; font-family: arial, helvetica, sans-serif; font-size: 16px;">': '',
  '</span>': '',
};

!(async function () {
  const res = await getPaperQuestionIdTypes(subcourseId);
  const data = res.data
  const name = data.V.subcourse.name;
  // const res = await getChapterQuestionIdTypesNoLogin(subcourseId);
  // const data = res.data;
  // const chapters = data.V.chapters;
  const chapters = data.V.papers;

  let indexQue = 1;
  let str = '';
  for (const i of chapters) {
    const questionIdTypes = i.questionIdTypes;
    const isOneRes = questionIdTypes.filter((i: any) => i[1] === 1);
    const isOneResTypeId = isOneRes.map((i: any) => i[0]);
    const res1 = await getQuestionListByIdsNoLogin(isOneResTypeId.join(','));
    const a = res1.data;
    const items = a.V;

    items.forEach((i: any) => {
      const title = i.questionTitle;
      const obAnswer = i.obAnswer;
      const optionsKey = ['a', 'b', 'c', 'd'];
      const options = optionsKey.map((j: any) => i[j]);
      str += `${indexQue++}、${title}（${obAnswer})\n`;
      str += optionsKey.map(j => j.toUpperCase()).map((j, jj) => {
        return `${j}、${options[jj]}\n`;
      }).join('');
      str += '\n';
    });
  }

  str = Object.keys(replaceMap).reduce((pre: string, cur: string) => {
    return pre.replaceAll(cur, '');
  }, str);

  fs.writeFile(path.resolve(__dirname, `output/${name}.txt`), str, (err) => {
    if (err) {
      console.log(err);
    }
  });
})();
