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

export async function queryItem() {
  return request('/item.json');
}
export async function querySummoner() {
  return request('/summoner.json');
}
export async function queryMing() {
  return request('/ming.json');
}
export async function getFreeHeros(params) {
  return request('/freeheros.json', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}
