import { queryHeroList, getHeroDetails } from '../service';

// https://umijs.org/zh-CN/plugins/plugin-dva
// https://dvajs.com/guide/
const HeroModel = {
  namespace: 'hero',

  state: {
    name: 'hero',
    loading: true,
    data: {},
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *fetch({ type, payload }, { put, call, select }) {
      // const data = yield call(queryHeroList);
      yield put({
        type: 'save',
        payload: {
          loading: true,
          data: {},
        },
      });
      const data = yield call(getHeroDetails, payload);
      const localData = 'localData';
      yield put({
        type: 'save',
        payload: {
          loading: false,
          data: data || localData,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     if (pathname === '/demo/dva') {
    //       dispatch({
    //         type: 'fetch',
    //         payload: {ename: 105},
    //       });
    //     }
    //   });
    // },
  },
};

export default HeroModel;
