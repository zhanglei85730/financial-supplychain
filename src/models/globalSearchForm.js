
export default {
  namespace: 'globalSearchForm',
  state: { formCollapse: false },
  reducers: {
    switchCollapse(state, { payload }) {
      return { ...state, formCollapse: payload };
    },
  },
  effects: {},
  subscriptions: {},
};
