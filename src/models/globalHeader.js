
export default {
  namespace: 'globalHeader',
  state: { username: '未登录' },
  reducers: {
    usernameChange(state, { payload }) {
      return { ...state, username: payload };
    },
  },
  effects: {},
  subscriptions: {},
};
