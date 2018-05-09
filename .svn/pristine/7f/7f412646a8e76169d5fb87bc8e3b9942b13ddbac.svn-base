import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    // const params = util.deleteJsonEmptyProps(payload);
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainDestroyReport}/api/destroy/getDestroylist`, opts);
  });
}
// 筛选条件 - 账号下拉框接口
export function getAccounts() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainDestroyReport}/api/destroy/getAccounts`, opts);
  });
}
// 筛选条件 - 部门下拉框接口
export function getDepts() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainDestroyReport}/api/destroy/getDepts`, opts);
  });
}
// 筛选条件 - 大区下拉框接口
export function getSites() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainDestroyReport}/api/destroy/getSites`, opts);
  });
}
// 筛选条件 - 审核生产数据
export function audit(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainDestroyReport}/api/destroy/audit`, opts);
  });
}
