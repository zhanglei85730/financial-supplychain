import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';
// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const { limit, offset } = payload;
    const params = util.params({ limit, offset });
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainTransferReceiptInternal}/transfereout/findListByQuery?${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const payload = payload ? payload : {};
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    // const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainTransferReceiptInternal}/transfereout/findFooter`, opts);
  });
}
// 调入部门
export function getDepartNameIn() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainTransferReceiptInternal}/transfereout/getDepartNameIn`, opts);
  });
}
// 调入仓库
export function getWarehouseNameIn() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainTransferReceiptInternal}/transfereout/getWarehouseNameIn`, opts);
  });
}
// 调出仓库
export function getWarehouseNameOut() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainTransferReceiptInternal}/transfereout/getWarehouseNameOut`, opts);
  });
}
