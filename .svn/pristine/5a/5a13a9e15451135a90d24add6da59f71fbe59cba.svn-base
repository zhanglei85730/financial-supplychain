import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domain}/api/getCancelOrderList?${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domain}/api/sumCancelOrderList?${params}`, opts);
  });
}
// 取消订单的单据类型下拉框
export function getAllCancelBillType(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(payload);
    return request(`${consts.domain}/api/getAllCancelBillType?${params}`, opts);
  });
}
