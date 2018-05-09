
export default {
  namespace: 'globalTabs',
  state: {
    activeTabKey: 'Cashier',
    tabPaths: [
      { path: '/Index' },
    ],
  },
  reducers: {
    // loation改变
    locationChange(state, { payload }) {
      const { tabPaths } = state;
      const payloadPath = `/${payload}`;
      const tabPathArr = tabPaths.filter((item) => {
        return item.path === payloadPath;
      });
      if (tabPathArr.length === 0) {
        const tabPathsMerge = state.tabPaths.concat([{ path: payloadPath }]);
        return { ...state, tabPaths: tabPathsMerge, activeTabKey: payload };
      } else {
        return { ...state, activeTabKey: payload };
      }
    },
    // 删除tab
    removeTab(state, { payload }) {
      console.log('111111')
      const { tabPaths, activeTabKey } = payload;
      return { ...state, tabPaths, activeTabKey };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      // query必须传入
      return history.listen(({ pathname }) => {
        const path = pathname.slice(1);
        if (path === '') {

        } else {
          dispatch({ type: 'locationChange', payload: path });
        }
      });
    },
  },
};
