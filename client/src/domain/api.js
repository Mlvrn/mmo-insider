import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const endpoints = {
  ping: 'ping.json',
  user: 'user',
  post: 'post',
  comment: 'comment',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(endpoints.ping, 'get');

export const registerApi = (data) => callAPI(`${endpoints.user}/register`, 'POST', {}, {}, data);
export const loginApi = (data) => callAPI(`${endpoints.user}/login`, 'POST', {}, {}, data);
export const forgotPasswordApi = (data) => callAPI(`${endpoints.user}/forgot-password`, 'POST', {}, {}, data);

export const getPostsApi = () => callAPI(`${endpoints.post}/all`, 'GET');
export const getPostByIdApi = (postId) => callAPI(`${endpoints.post}/${postId}`, 'GET');
export const getUsersApi = () => callAPI(`${endpoints.user}/all`, 'GET');
export const getUserByIdApi = (token) => callAPI(`${endpoints.user}`, 'GET', { Authorization: `Bearer ${token}` });

export const createPostApi = (data, token) =>
  callAPI(`${endpoints.post}/create`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);

export const votePostApi = (postId, data, token) =>
  callAPI(`${endpoints.post}/vote/${postId}`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);

export const deletePostByIdApi = (postId, token) =>
  callAPI(`${endpoints.post}/delete/${postId}`, 'DELETE', { Authorization: `Bearer ${token}` });

export const editPostById = (postId, data, token) =>
  callAPI(`${endpoints.post}/edit/${postId}`, 'PUT', { Authorization: `Bearer ${token}` }, {}, data);

export const getCommentsByPostIdApi = (postId) => callAPI(`${endpoints.comment}/all/${postId}`, 'GET');
export const createCommentApi = (postId, data, token) =>
  callAPI(`${endpoints.comment}/create/${postId}`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);
