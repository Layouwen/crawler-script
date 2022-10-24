const questionTypeArr = [
  '【熟记】',
  '【必会】',
  '【理解】',
];
const right = '';

let output = '';
const $items = document.querySelectorAll('.data__items');
Array.from($items).forEach(i => {
  const $title = i.querySelector('.data__tit_cjd');
  const title = $title.childNodes[0].data;
  if (!questionTypeArr.some(q => title.includes(q)) && !title.includes('您的姓名')) {
    const options = [];

    const $right = i.querySelector('.judge_ques_right');
    const isRight = Array.from($right.childNodes).some(r => r.innerText.includes('回答正确'));

    let answer;

    const $ulradiochecks = i.querySelectorAll('.ulradiocheck > div');
    Array.from($ulradiochecks).forEach(u => {
      options.push(u.innerText.slice(1));
      if (isRight && u.innerText.includes(right)) {
        answer = u.innerText[1];
      }
    });

    if (!isRight) {
      const $rightAnswer = i.querySelector('.answer-ansys');
      answer = $rightAnswer.childNodes[1].innerText[0];
    }
    output += `${title}(${answer})\n`;
    output += options.join('\n') + '\n\n';
  }
});
console.log(output);
