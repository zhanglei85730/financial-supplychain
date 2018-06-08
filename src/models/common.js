import { message } from 'antd';
import menuData from '../config/menu.js';
import * as service from '../services/common.js';
import { iteratorMenu, formParamsFormater } from '../utils/util.js';
import consts from '../config/const.js';

export default {
  namespace: 'common',
  state: {
    breadcrumb: [
      {
        name: '金蝶供应链',
      },
    ],
    // 刷新时的的查询条件,
    // commonQueryCondition: {},
    // 刷新时的翻页参数
    commonPaginnation: { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize },
    // 供应商loading
    supplierTableLoading: true,
    // 菜单默认选中
    activeKey: 'purchaseOrders',
    // 默认打开菜单
    defaultOpenKeys: '0',
    // 所有法人
    allCorporation: [],
    // 结算方式
    allPaymentMethod: [],
    // 付款方式
    allPayment: [],
    // 付款单下面的付款方式
    allFundsPayment: {},
    // 事业部select
    allOrg: [],
    allVoucherStatus: {},
    allWarehouse: [],
    // 供应商
    supplierModalVisibile: false,
    // 供应商
    supplierList: { rows: [], total: 0 },
    supplierSelect: {},
    // 刷新时保存的上次查询条件
    queryParams: {},
    // 普通入库类型下拉selct
    allReceiptType: {},
    pushEasModalVisible: false,
    // 推送金蝶
    pushEasResponse: [],
    // 通用保存翻页参数及查询条件，用于刷新table数据（保存翻页页码及查询参数）
    globalPagationParam: null,
    approveDataLoading: false,
    // 大区
    allSite: {},
    // 上传
    uploadStatu: false,
    // 币别    
    currency: [
      { value: 'CNY', text: 'CNY' },
      { value: 'USD', text: 'USD' },
      { value: 'GBP', text: 'GBP' },
      { value: 'EUR', text: 'EUR' },
      { value: 'AUD', text: 'AUD' },
      { value: 'BRL', text: 'BRL' },
      { value: 'CHF', text: 'CHF' },
      { value: 'CZK', text: 'CZK' },
      { value: 'DKK', text: 'DKK' },
      { value: 'HKD', text: 'HKD' },
      { value: 'HUF', text: 'HUF' },
      { value: 'JPY', text: 'JPY' },
      { value: 'MXN', text: 'MXN' },
      { value: 'NOK', text: 'NOK' },
      { value: 'NZD', text: 'NZD' },
      { value: 'PLN', text: 'PLN' },
      { value: 'PHP', text: 'PHP' },
      { value: 'RUB', text: 'RUB' },
      { value: 'SEK', text: 'SEK' },
      { value: 'SGD', text: 'SGD' },
    ],
  },
  reducers: {
    // 审核按钮状态
    // setQueryParams(state, { payload }) {
    //   const { commonQueryCondition } = state;
    //   const newCommonQueryCondition = Object.assign({}, commonQueryCondition, payload);
    //   return { ...state, commonQueryCondition: newCommonQueryCondition };
    // },
    setUploadStatu(state, { payload }) {
      return { ...state, uploadStatu: payload };
    },
    setCommonPaginnation(state, { payload = { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize } }) {
      return { ...state, commonPaginnation: payload };
    },
    // 重置查询参数及翻页参数
    // 审核按钮状态
    resetCommonQueryParams(state, { payload }) {
      return { ...state, commonQueryCondition: payload };
    },
    // 审核按钮状态
    approveDataLoadingReduce(state, { payload }) {
      return { ...state, approveDataLoading: payload };
    },
    // 隐藏推送到金蝶
    pushEasModalVisibleReduce(state, { payload }) {
      return { ...state, pushEasModalVisible: payload };
    },
    // 大区
    allSiteReduce(state, { payload }) {
      return { ...state, allSite: payload };
    },
    // 通用保存翻页参数及查询条件
    globalPagationParamRedece(state, { payload }) {
      return { ...state, globalPagationParam: payload };
    },
    changeBreadcrumb(state, { payload: breadcrumb }) {
      return { ...state, ...breadcrumb };
    },
    // 当前默认select菜单
    activeKeyReduce(state, { payload }) {
      return { ...state, activeKey: payload };
    },
    defaultOpenKeysReduce(state, { payload }) {
      return { ...state, defaultOpenKeys: payload };
    },
    updateActiveIndex(state, action) {
      const pathname = action.payload;
      // let breadcrumbItem = '';
      const breadcrumbArr = [];
      // 生成层级面包削方法
      function breadcrumb(node) {
        node.map((item) => {
          if (item.hasOwnProperty('children')) {
            breadcrumb(item.children);
          } else {
            // breadcrumbItem = node.name;
            if (pathname === item.path) {
              if (item.hasOwnProperty('parentName')) {
                breadcrumbArr.push({ name: item.parentName }, { name: item.name });
              } else {
                breadcrumbArr.push({ name: item.name });
              }
            }
          }
        });
      }
      breadcrumb(menuData);
      return {
        ...state,
        breadcrumb: [state.breadcrumb[0], ...breadcrumbArr],
      };
    },
    // 所有法人
    getAllCorporationReduce(state, { payload }) {
      return { ...state, allCorporation: payload };
    },
    // 所有事业部
    getAllOrgReduce(state, { payload }) {
      return { ...state, allOrg: payload };
    },
    // 结算方式
    getAllPaymentMethodRedece(state, { payload }) {
      return { ...state, allPaymentMethod: payload };
    },
    // 付款方式
    getAllPaymentRedece(state, { payload }) {
      return { ...state, allPayment: payload };
    },
    // 付款单下的付款方式
    getallFundsPaymentRedece(state, { payload }) {
      return { ...state, allFundsPayment: payload };
    },
    // 单据状态
    getAllVoucherStatusRedece(state, { payload }) {
      return { ...state, allVoucherStatus: payload };
    },
    // 仓库名称
    getAllWarehouseRedece(state, { payload }) {
      return { ...state, allWarehouse: payload };
    },
    // 供应商
    supplierModalVisibileReduce(state, { payload }) {
      return { ...state, supplierModalVisibile: payload };
    },
    // 供应商
    allSupplierReduce(state, { payload }) {
      return { ...state, supplierList: payload, supplierTableLoading: false };
    },
    supplierSelect(state, { payload }) {
      return { ...state, supplierSelect: payload };
    },
    supplierSearchListReduce(state, { payload }) {
      if (!payload || !(payload.hasOwnProperty('rows') && Array.isArray(payload.rows) && payload.rows.length !== 0)) {
        return { ...state, supplierSearchList: [] };
      }
      return { ...state, supplierSearchList: payload };
    },
    ClearSupplierSelect(state, { payload }) {
      return { ...state, supplierSelect: {} };
    },
    // 查询参数
    queryParamsReduce(state, { payload }) {
      return { ...state, queryParams: payload };
    },
    // 供应商loading reduce
    supplierTableLoadingReduce(state, { payload }) {
      if (Array.isArray(state.supplierList) && state.supplierList.length === 0) {
        return { ...state, supplierTableLoading: payload };
      }
      return { ...state, supplierTableLoading: false };
    },
    getAllReceiptTypeReduce(state, { payload }) {
      return { ...state, allReceiptType: payload };
    },
    // 推送到金蝶modal
    pushEasModalRedece(state, { payload }) {
      return { ...state, pushEasModalVisible: payload };
    },
    // 推送到金蝶modal
    pushEasResponseRedece(state, { payload }) {
      return { ...state, pushEasResponse: state.pushEasResponse.concat([payload]) };
    },
    //  清除上次websock 相应messages
    pushEasClearResponseRedece(state, { payload }) {
      return { ...state, pushEasResponse: [] };
    },
  },
  effects: {
    // 大区下拉
    *getAllSite({ payload }, { call, put }) {
      const response = yield call(service.getAllSite, payload);
      // 验证数据
      const requestSuccess = yield call(service.validateFetch, response);
      if (!requestSuccess) return false;
      // 验证通过继续执行
      yield put({
        type: 'allSiteReduce',
        payload: response.data.data,
      });
    },
    *getAllCorporation({ payload }, { call, put }) {
      const response = yield call(service.getAllCorporation, payload);
      // 验证数据
      const requestSuccess = yield call(service.validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getAllCorporationReduce',
        payload: response.data.data,
      });
    },
    *getAllOrg({ payload }, { call, put }) {
      const response = yield call(service.getAllOrg);
      // 验证数据
      const requestSuccess = yield call(service.validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getAllOrgReduce',
        payload: response.data.data,
      });
    },
    *getAllPaymentMethod({ payload }, { call, put }) {
      const response = yield call(service.getAllPaymentMethod);
      // 验证数据
      const requestSuccess = yield call(service.validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getAllPaymentMethodRedece',
        payload: response.data.data,
      });
    },
    *getAllPayment({ payload }, { call, put }) {
      const response = yield call(service.getAllPayment);
      // 验证数据
      const requestSuccess = yield call(service.validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getAllPaymentRedece',
        payload: response.data.data,
      });
    },
    *allFundsPayment({ payload }, { call, put }) {
      const response = yield call(service.getAllFundsPayment);
      // 验证数据
      const requestSuccess = yield call(service.validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getallFundsPaymentRedece',
        payload: response.data.data,
      });
    },
    *getAllVoucherStatus({ payload }, { call, put }) {
      const response = yield call(service.getAllVoucherStatus);
      // 验证数据
      const requestSuccess = yield call(service.validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getAllVoucherStatusRedece',
        payload: response.data.data,
      });
    },
    *getAllWarehouse({ payload }, { call, put }) {
      const response = yield call(service.getAllWarehouse);
      // 验证数据
      const requestSuccess = yield call(service.validateFetch, response);
      if (!requestSuccess) return false;
      yield put({
        type: 'getAllWarehouseRedece',
        payload: response.data.data,
      });
    },
    *getAllSupplier({ payload }, { call, put }) {
      const response = yield call(service.getAllSupplier, payload);
      // 验证数据
      const isRequestSuccess = yield call(service.validateFetch, response);
      if (!isRequestSuccess) return false;
      // 验证通过继续执行
      yield put({
        type: 'allSupplierReduce',
        payload: response.data.data,
      });
    },
    *getAllReceiptType({ payload }, { call, put }) {
      const response = yield call(service.getAllReceiptType, payload);
      // 验证数据
      const isRequestSuccess = yield call(service.validateFetch, response);
      if (!isRequestSuccess) return false;
      yield put({
        type: 'getAllReceiptTypeReduce',
        payload: response.data.data,
      });
    },
    // 推送到金蝶
    * pushEas({ payload }, { call, put }) {
      yield call(service.pushEas, payload);
    },
    // 推送到金蝶（调拨单据、跨法人调拨）
    * pushEas2({ payload }, { call, put }) {
      const response = yield call(service.pushEas2, payload);
    },
    // 审核数据(参数为ids,选择的rows的id)
    *commonApproveData({ payload }, { call, put }) {
      const { selectedRowsArr, ...rest } = payload;
      const leaves = rest;
      const ids = [];
      if (Array.isArray(selectedRowsArr) && selectedRowsArr.length > 0) {
        selectedRowsArr.forEach((item) => {
          item.hasOwnProperty('id') ? ids.push(item.id) : '';
        });
      }
      const { data } = yield call(service.commonApproveData, { ...leaves, ids: ids.join(',') });
      if (!data) {
        message.error('审核数据失败');
        return false;
      }
      if (data.hasOwnProperty('success') && data.success) {
        let sucdessMessage = '审核数据成功';
        if (data.hasOwnProperty('message' && data.message)) {
          sucdessMessage = data.message;
        }
        message.success(sucdessMessage);
      } else {
        if (data.hasOwnProperty('message' && data.message)) {
          message.error(data.message);
        }
        message.error('审核数据失败');
      }
    },
    // 通用删除数据 参数为id
    *commonDeleteData({ payload }, { call, put, select }) {
      const { selectedRowsArr, paramsKey = 'ids', refreshTableReduce, ...rest } = payload;
      const ids = [];
      if (Array.isArray(selectedRowsArr) && selectedRowsArr.length > 0) {
        selectedRowsArr.forEach((item) => {
          item.hasOwnProperty('id') ? ids.push(item.id) : '';
        });
      } else {
        message.error('请选择数据然后在操作');
      }
      const { data } = yield call(service.commonDeleteData, { [paramsKey]: ids.join(','), ...rest });
      if (!data) {
        message.error('删除数据失败');
        return false;
      }
      if (data.hasOwnProperty('success') && data.success) {
        let sucdessMessage = '删除数据成功';
        if (data.hasOwnProperty('message' && data.message)) {
          sucdessMessage = data.message;
        }
        message.success(sucdessMessage);
        // 刷新表格数据，从全局获取查询条件及翻页参数
        const { queryParams, commonPaginnation } = yield select(state => state.common);
        if (refreshTableReduce) {
          yield put({
            type: refreshTableReduce,
            payload: Object.assign(commonPaginnation, queryParams),
          });
        }
      } else {
        if (data.hasOwnProperty('message' && data.message)) {
          message.error(data.message);
        }
        message.error('删除数据失败');
      }
    },
    //  审核数据(可以勾选及携带查询提交,同时存在只提交勾选数据，忽略查询条件)
    *commonApproveDataWithcondition({ payload }, { call, put }) {
      const { url, type, selectedRowsArr, fieldsValue, dispatch, action, paramKey = 'id', ...rest } = payload;
      let formParams = '';
      const idsArr = [];
      if (Array.isArray(selectedRowsArr) && selectedRowsArr.length > 0) {
        selectedRowsArr.forEach((item) => {
          if (item.hasOwnProperty('id') && item.id !== undefined) {
            idsArr.push(item.id);
          }
        });
        formParams = { [paramKey]: idsArr.join(',') };
      } else {
        formParams = formParamsFormater(fieldsValue);
      }
      const result = { url, type, ...formParams, ...rest };
      // 审核状态按钮加载中     
      const { data = false, success = false } = yield call(service.commonApproveDataWithcondition, result);
      dispatch({ type: 'common/approveDataLoadingReduce', payload: false });
      let isHaveErrorInfo = false;
      // 刷新表格      
      if (data) {
        if (data.hasOwnProperty('success') && data.success === true) {
          message.success('操作成功');

        } else {
          if (data.hasOwnProperty('error') && data.error.hasOwnProperty('message')) {
            message.error(data.error.message);
            isHaveErrorInfo = true;
          } else if (data.hasOwnProperty('success') && data.success === false) {
            if (data.hasOwnProperty('message') && data.message !== null && data.message !== '') {
              message.error(data.message);
              isHaveErrorInfo = true;
            }
          }
          if (!isHaveErrorInfo) {
            message.error('操作失败');
          }
        }
        // 刷新表格 成功失败都会刷新
        if (action !== undefined) {
          // 合并查询参数
          const { type } = action;
          const parmasDeleteEmpty = formParamsFormater(fieldsValue);
          const defaultParmas = { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize };
          dispatch({ type, payload: Object.assign(defaultParmas, parmasDeleteEmpty) });
        }
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // 切换页面清空全局查询参数及分页参数
        dispatch({ type: 'resetCommonQueryParams', payload: {} });
        dispatch({ type: 'setCommonPaginnation' });
        // 重置上传文件状态
        dispatch({ type: 'setUploadStatu', payload: false });
        // 获取用户名
        const username = window.sessionStorage.getItem('username');
        if (username) {
          dispatch({ type: 'globalHeader/usernameChange', payload: username });
        }
        // 与当前pathname匹配的menu菜单节点
        const findPathName = iteratorMenu(menuData, pathname);
        if (findPathName !== undefined) {
          dispatch({ type: 'activeKeyReduce', payload: findPathName.key });
          dispatch({ type: 'defaultOpenKeysReduce', payload: findPathName.parentKey });
        }
        // 切换页面清空保存的翻页参数
        dispatch({ type: 'globalPagationParamRedece', payload: null });
        // 切换页面清空查询条件
        dispatch({ type: 'queryParamsReduce', payload: {} });
        // 切换页面清空统一状态选择的供应商
        dispatch({ type: 'supplierSelect', payload: {} });
        dispatch({ type: 'getAllOrg' });
        dispatch({ type: 'getAllCorporation' });
        dispatch({ type: 'getAllPaymentMethod' });
        dispatch({ type: 'getAllVoucherStatus' });
        dispatch({ type: 'getAllWarehouse' });
        dispatch({ type: 'getAllPayment' });
        // 仓库
        if (pathname === '/commonInbound' ||
          pathname === '/purchaseReturn') {
          dispatch({ type: 'getAllWarehouse' });
        }
        // 付款单下的付款方式
        if (pathname === '/purchaseAdvance' ||
          pathname === '/purchasePayment' ||
          pathname === '/purchasePayment' ||
          pathname === '/freight') {
          dispatch({ type: 'allFundsPayment' });
        }
        // 普通入库 类型select
        if (pathname === '/commonInbound') {
          dispatch({ type: 'getAllReceiptType' });
        }
        // 站点（大区）
        if (pathname === '/amazonInventory') {
          dispatch({ type: 'getAllSite' });
        }
        dispatch({
          type: 'updateActiveIndex',
          payload: pathname,
        });
      });
    },
  },
};

