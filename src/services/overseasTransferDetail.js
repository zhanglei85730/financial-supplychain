import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainOverseasTransfer}/api/unfba/non_fba_transfer_order/search?${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainOverseasTransfer}/api/sumPurchaseOrderList?${params}`, opts);
  });
}
// 非FBA仓调拨明细-核销
export function genVerifityData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const jsonParams = payload ? payload : {};
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(jsonParams) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainOverseasTransfer}/api/unfba/non_fba_transfer_order/gen_verifity_data`, opts);
  });
}
