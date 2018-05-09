import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';
import { fetchUUID } from './common.js';
// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domain}/api/getRefundOrderList?${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domain}/api/sumRefundOrderList?${params}`, opts);
  });
}
// 获取付款方式
export function getAllPayment() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domain}/api/getAllPayment`, opts);
  });
}
