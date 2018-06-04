import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const { limit = consts.defaultPageSize - consts.extraPageSize, offset = 0 } = payload;
    const params = util.params({ limit, offset });
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainCorporateTransfer}/declare/details/findList?${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    // const params = util.params(util.deleteJsonEmptyProps(payload));
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainCorporateTransfer}/declare/details/findFooter`, opts);
  });
}
// table数据总计
export function getExceptionMsg() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainCorporateTransfer}/declare/details/getExceptionMsg`, opts);
  });
}
// 修改 /declare/details/saveData
export function modify(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    // const params = util.params(util.deleteJsonEmptyProps(payload));
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainCorporateTransfer}/declare/details/saveData`, opts);
  });
}
// 撤销审核
export function revokeAudit(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainCorporateTransfer}/declare/details/revokeAudit${params}`, opts);
  });
}
