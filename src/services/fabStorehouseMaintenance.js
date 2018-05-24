import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';
// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainFabStorehouseMaintenance}/api/getSkuRealtion?${params}`, opts);
  });
}
// add
export function add(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    // const params = util.params(util.deleteJsonEmptyProps(payload));
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainFabStorehouseMaintenance}/api/saveSkuRealtion`, opts);
  });
}
// 保存
export function modify(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    // const params = util.params(util.deleteJsonEmptyProps(payload));
    Object.assign(opts, { method: 'put' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainFabStorehouseMaintenance}/api/modifySkuRealtion`, opts);
  });
}
// 删除
export function deleteData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainFabStorehouseMaintenance}/warehouse/delete?${params}`, opts);
  });
}
