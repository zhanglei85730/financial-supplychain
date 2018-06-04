import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainFbaWarehouseAllotLedger}/api/fba_warehouse_allot_ledger/search${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainFbaWarehouseAllotLedger}/api/sumPurchaseOrderList${params}`, opts);
  });
}
// 审核生成数据
export function claimData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const { datePeriod } = payload;
    // 转换日期格式
    Object.assign(payload, { datePeriod: datePeriod.format('YYYYMM') });
    return request(`${consts.domainFbaWarehouseAllotLedger}/api/fba_warehouse_allot_ledger/build_eas_data?datePeriod=${payload.datePeriod}`, opts);
  });
}
// 审核生成数据
export function uploadTest(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainFbaWarehouseAllotLedger}/api/fba_warehouse_allot_ledger/import_test`, opts);
  });
}
