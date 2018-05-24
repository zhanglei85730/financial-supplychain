import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';
// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainSaleData}/api/getSalesOutLedger?${params}`, opts);
  });
}
// 审核接口
export function approveData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainSaleData}/inout_bound_detail/approve_data?${params}`, opts);
  });
}
// 新增接口
export function add(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainSaleData}/businessType/add?${params}`, opts);
  });
}
