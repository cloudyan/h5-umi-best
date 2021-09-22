import { request } from 'umi';

// mock 示例
export async function queryHeroList() {
  return request('mock/web201605/js/herolist.json');
}
export async function getHeroDetails(params) {
  return request('mock/herodetails.json', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(params),
  });
}

const API_PATH = '/';
export async function getDemoApi(params = {}) {
  return request(`${API_PATH}`, {
    // timeout: 3000,
    // method: 'get',
    prefix: 'http://127.0.0.1:8888',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    params,
    credentials: 'include',
    // skipErrorHandler: true, // 跳过默认的错误处理
  });
}
