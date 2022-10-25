import axios from 'axios';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYmFpamlheXVuLmNvbmdyYWVkdS5jbi9hcGkvYXBwL2xvZ2luIiwiaWF0IjoxNjY2Njk3MDI3LCJleHAiOjE2OTY5MzcwMjcsIm5iZiI6MTY2NjY5NzAyNywianRpIjoiOWh2cVZKT1ZoRHYwcHRBeCIsInN1YiI6MTM0NiwicHJ2IjoiOWYxZmU5ZTBkZmZiZTQ0NDJkYzc4MzEwNzUxZjU5MWNmNGQxNDAyMCJ9.5gHjyhru6nSa8BPKt3ccWIWkP_6Mn0_RaDDsDfBTa3o';

const request = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getHomeworkDetail = (id: string | number) => {
  return request.get(`https://baijiayun.congraedu.cn/api/app/homework/detail/${id}`);
};

export default request;
