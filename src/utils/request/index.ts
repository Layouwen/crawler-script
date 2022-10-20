import axios from 'axios';
import { token } from '../../config';

const request = axios.create({headers: {authorization: `Bearer ${token}`}});

request.interceptors.response.use((res) => res.data);

export default request;
