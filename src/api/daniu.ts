import axios from 'axios';
import config from '../config';

const request = axios.create({headers: {authorization: `Bearer ${config.daniu.token}`}});

request.interceptors.response.use((res) => res.data);

export default request;
