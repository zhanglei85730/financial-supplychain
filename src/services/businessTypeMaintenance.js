import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainBusinessTypeMaintenance}/businessType/list${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainBusinessTypeMaintenance}/api/sumPurchaseOrderList${params}`, opts);
  });
}
// add
export function add(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainBusinessTypeMaintenance}/businessType/add${params}`, opts);
  });
}
// 保存
export function modify(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainBusinessTypeMaintenance}/businessType/modify${params}`, opts);
  });
}
// 删除
export function deleteData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainBusinessTypeMaintenance}/businessType/delete${params}`, opts);
  });
}
// 导出
export function exportTmeplet() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainBusinessTypeMaintenance}/businessType/download`, opts);
  });
}
