import axios from 'axios';

// 鉴权 Cookie
const Cookie = 'JSESSIONID=68148AC6AEADE49664AE0A95399BACF7';

const request = axios.create({headers: {Cookie}});


export const getQuestionListByIdsNoLogin = async (questionIds: string) => {
  return await request.get('http://huanan-edu.com/tiku/questionLib/getQuestionListByIdsNoLogin.do', {
    params: {
      questionIds,
    },
  });
};

export const getChapterQuestionIdTypesNoLogin = async (subcourseId: string) => {
  return await request.get('http://huanan-edu.com/tiku/course/getChapterQuestionIdTypesNoLogin.do', {
    params: {
      subcourseId,
      time: '1666877564000',
    },
  });
};
