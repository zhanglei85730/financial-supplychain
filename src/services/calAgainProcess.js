import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainInventory}/cal_again_process/search?${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainInventory}/api/sumPurchaseOrderList?${params}`, opts);
  });
}
// 重算接口
export function addCalAgainProcess(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(payload);
    return request(`${consts.domainInventory}/inbound_detail/add_cal_again_process?${params}`, opts);
  });
}

