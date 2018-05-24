import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';
// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainBusinessTypeMaintenance}/warehouse/list?${params}`, opts);
  });
}
// add
export function add(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainBusinessTypeMaintenance}/warehouse/add?${params}`, opts);
  });
}
// 保存
export function modify(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainBusinessTypeMaintenance}/warehouse/modify?${params}`, opts);
  });
}
// 删除
export function deleteData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainBusinessTypeMaintenance}/warehouse/delete?${params}`, opts);
  });
}
