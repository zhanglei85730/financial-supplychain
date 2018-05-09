import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainAmazonInventory}/api/getFbaInventorys?${params}`, opts);
  });
}
// 部门
export function getAllDepart() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainAmazonInventory}/common/getAllDepart`, opts);
  });
}
// 部门
export function getAllAccount() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainAmazonInventory}/common/getAllAccount`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    if (!params) {
      return request(`${consts.domainAmazonInventory}/api/sumFbaInventorys`, opts);
    }
    return request(`${consts.domainAmazonInventory}/api/sumFbaInventorys?${params}`, opts);
  });
}
