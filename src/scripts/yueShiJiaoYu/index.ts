import * as fs from 'fs';
import * as path from 'path';
import { getChapterQuestionIdTypesNoLogin, getQuestionListByIdsNoLogin } from '../../api/yueShiJiaoYu';

// 科目 id
const subcourseId = '628';

!(async function () {
  const res = await getChapterQuestionIdTypesNoLogin(subcourseId);
  const data = res.data;
  const chapters = data.V.chapters;

  let indexQue = 1;
  const name = '政治考试题';
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

  fs.writeFile(path.resolve(__dirname, `output/${name}`), str, (err) => {
    if (err) {
      console.log(err);
    }
  });
})();
