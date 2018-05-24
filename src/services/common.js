import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';
import { message } from 'antd';
// 加载table数据
export function getAllCorporation() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domain}/api/getAllCorporation`, opts);
  });
}
// 获取事业部
export function getAllOrg() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domain}/api/getAllOrg`, opts);
  });
}
// 获取结算方式
export function getAllPaymentMethod() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domain}/api/getAllPaymentMethod`, opts);
  });
}
// 获取单据状态
export function getAllVoucherStatus() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domain}/api/getAllVoucherStatus`, opts);
  });
}
// 获取仓库名称
export function getAllWarehouse() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domain}/api/getAllWarehouse`, opts);
  });
}
// 获取付款方式
export function getAllPayment() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domain}/api/getAllPayment`, opts);
  });
}
// 付款单下面的付款方式
export function getAllFundsPayment() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domain}/api/getAllFundsPayment`, opts);
  });
}
// 大区下拉select
export function getAllSite() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainAmazonInventory}/common/getAllSite`, opts);
  });
}
// 普通入库类型下拉select
export function getAllReceiptType() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domain}/api/getAllReceiptType`, opts);
  });
}
// get UUID推送进度
export function fetchUUID(fetchUUIDUrl) {
  return new Promise((resolve) => {
    return util.getSecurityHeaderFormLocal().then((opts) => {
      let uuid = '';
      if (fetchUUIDUrl !== undefined) {
        uuid = request(fetchUUIDUrl, opts);
      } else {
        uuid = request(`${consts.domain}/aip/fetchUUID`, opts);
      }
      if (opts && uuid) {
        resolve(uuid);
      }
    });
  });
}
// 供应商
export function getAllSupplier(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const queryparmas = payload === undefined ? {} : payload;
    if (!queryparmas.hasOwnProperty('offset') && !queryparmas.hasOwnProperty('limit')) {
      // 默认翻页参数
      Object.assign(queryparmas, { offset: 0, limit: 10 });
    }
    const params = util.params(queryparmas);
    return request(`${consts.domain}/api/getAllSupplier?${params}`, opts);
  });
}
// 推送到金蝶
export function pushEas({
  params,
  dispatchMethod,
  // pushEasName,
  modelNameSapce,
  pushEasUrl,
  moduleModelNameSapce,
  wsUrl,
  pushEasUrlMethod,
  commonPaginnation = { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize },
  fetchUUIDUrl,
}) {
  //dispatchMethod({ type: 'purchaseOrders/pushEasModalVisible', payload: false });   
  fetchUUID(fetchUUIDUrl).then((uuid) => {
    const { data } = uuid;
    const formatParams = util.deleteJsonEmptyProps(params);
    const addUUID = Object.assign({}, formatParams, { uuid: data.data });
    const result = util.params(addUUID);
    const ws = new WebSocket(`${wsUrl}?${result}`);

    //业务逻辑
    function serviceLogic() {
      return util.getSecurityHeaderFormLocal().then((opts) => {
        const addUUID2 = Object.assign({}, formatParams, { uuId: data.data });
        const result2 = util.params(addUUID2);
        if (pushEasUrl !== undefined) {
          if (pushEasUrlMethod === 'post') {
            Object.assign(opts, { method: 'post' });
            Object.assign(opts, { body: JSON.stringify(addUUID2) });
          }
          return request(`${pushEasUrl}?${result2}`, opts);
        }
      });
    }
    ws.onopen = function () {
      serviceLogic();
    };
    ws.onmessage = function (evt) {
      const wsData = JSON.parse(evt.data);
      dispatchMethod({ type: `${modelNameSapce}/pushEasResponseRedece`, payload: wsData });
      if (wsData.type === 'ERROR') {

      }
      if (wsData.type === 'SUCCESS') {
        ws.close();
        // 隐藏modal
        // dispatchMethod({ type: `${modelNameSapce}/pushEasModalVisibleReduce`, payload: false });
        // 刷新表格            
        if (moduleModelNameSapce !== undefined) {
          const { ids, ...rest } = formatParams;
          dispatchMethod({ type: `${moduleModelNameSapce}/tableData`, payload: Object.assign({}, commonPaginnation, rest) });
        }
      }
    };
    ws.onclose = function () {
      // websocket is closed.
      // alert("Connection is closed...");
    };
    ws.onerror = function () {
      serviceLogic();
    };
  });
}
// 统一处理请求容错
export function validateFetch(fetchData) {
  const { err, url, data } = fetchData;
  if (data === undefined || data.data === null) { return false; }
  // 默认返回格式
  const defaultData = { data: { data: { total: 0, rows: [] } } };
  if (err !== undefined) {
    if (url !== undefined) {
      message.error(` 接口错误,URL:${url}`);
    } else {
      message.error("接口错误");
    }
    return false;
  }
  // 相应成功 success为false
  if (data !== undefined && util.hasProperty(data, 'success') && !data.success) {
    if (util.hasProperty(data, 'message')) {
      // message.error(data.message);
    }
    return false;
  }
  // 相应成功 success为false 返回默认数据格式无total、rows
  if (!util.hasProperty(data, 'data') || !util.hasProperty(data.data, 'total') || !util.hasProperty(data.data, 'rows')) {
    return defaultData;
  }
  return fetchData;
}
// 通用审核数据 参数为ids
export function commonApproveData({ url, paramKey, ids }) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${url}?${paramKey}=${ids}`, opts);
  });
}
// 通用审核数据 参数为ids或查询条件,同时存在忽略ids
export function commonApproveDataWithcondition({ url, type = 'get', ...rest }) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    if (type === 'post') {
      Object.assign(opts, { method: 'post' }, { body: JSON.stringify(rest) });
      return request(`${url}`, opts);
    } else {
      const params = util.params(util.deleteJsonEmptyProps(rest));
      const sentParams = params ? `?${params}` : '';
      return request(`${url}${sentParams}`, opts);
    }
  });
}
// 通用删除数据行
export function commonDeleteData({ url, type = 'get', ...rest }) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    if (type === 'post') {
      Object.assign(opts, { method: 'post' }, { body: JSON.stringify(rest) });
      return request(`${url}`, opts);
    } else {
      const params = util.params(util.deleteJsonEmptyProps(rest));
      const sentParams = params ? `?${params}` : '';
      return request(`${url}${sentParams}`, opts);
    }
  });
}
