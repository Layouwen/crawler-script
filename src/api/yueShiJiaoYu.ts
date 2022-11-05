import axios from 'axios';

// 鉴权 Cookie
const Cookie = 'JSESSIONID=052D4A613A7B95D643F139E74D940A9F';

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

export const getPaperQuestionIdTypes = async (subcourseId: string) => {
  return await request.get('http://huanan-edu.com/tiku/paper/getPaperQuestionIdTypes.do', {
    params: {
      subcourseId,
      PaperTypeId: 1,
      time: 1667663580000,
    },
  });
};

