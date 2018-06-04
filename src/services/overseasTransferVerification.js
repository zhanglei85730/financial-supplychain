import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainOverseasTransfer}/api/unfba/non_fba_transfer_verifity/search${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainOverseasTransfer}/api/sumPurchaseOrderList${params}`, opts);
  });
}
// // 审核生成内部调拨
// export function geEasData(payload = {}) {
//   return util.getSecurityHeaderFormLocal().then((opts) => {
//     // Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
//     // Object.assign(opts.headers, { 'Content-Type': 'application/json' });
//     const params = util.params(util.deleteJsonEmptyProps(payload), '?');
//     return request(`${consts.domainOverseasTransfer}/api/unfba/non_fba_transfer_order/gen_eas_data${params}`, opts);
//   });
// }
// // 非FBA仓核销-审核
// export function verifity(payload = {}) {
//   return util.getSecurityHeaderFormLocal().then((opts) => {
//     // Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
//     // Object.assign(opts.headers, { 'Content-Type': 'application/json' });
//     const params = util.params(util.deleteJsonEmptyProps(payload), '?');
//     return request(`${consts.domainOverseasTransfer}/api/unfba/non_fba_transfer_verifity/verifity${params}`, opts);
//   });
// }
// // 非FBA仓核销-反审核
// export function unVerifityy(payload = {}) {
//   return util.getSecurityHeaderFormLocal().then((opts) => {
//     // Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
//     // Object.assign(opts.headers, { 'Content-Type': 'application/json' });
//     const params = util.params(util.deleteJsonEmptyProps(payload), '?');
//     return request(`${consts.domainOverseasTransfer}/api/unfba/non_fba_transfer_verifity/unVerifityy${params}`, opts);
//   });
// }
// // 非FBA仓核销-过账
// export function post(payload = {}) {
//   return util.getSecurityHeaderFormLocal().then((opts) => {
//     // Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
//     // Object.assign(opts.headers, { 'Content-Type': 'application/json' });
//     const params = util.params(util.deleteJsonEmptyProps(payload), '?');
//     return request(`${consts.domainOverseasTransfer}/api/unfba/non_fba_transfer_verifity/post${params}`, opts);
//   });
// }
// // 非FBA仓核销-反核销
// export function unPost(payload = {}) {
//   return util.getSecurityHeaderFormLocal().then((opts) => {
//     // Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
//     // Object.assign(opts.headers, { 'Content-Type': 'application/json' });
//     const params = util.params(util.deleteJsonEmptyProps(payload), '?');
//     return request(`${consts.domainOverseasTransfer}/api/unfba/non_fba_transfer_verifity/unPost${params}`, opts);
//   });
// }
// // 非FBA仓核销-审核生成其他出库数据
// export function genOtherOutData(payload = {}) {
//   return util.getSecurityHeaderFormLocal().then((opts) => {
//     // Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
//     // Object.assign(opts.headers, { 'Content-Type': 'application/json' });
//     const params = util.params(util.deleteJsonEmptyProps(payload), '?');
//     return request(`${consts.domainOverseasTransfer}/api/unfba/non_fba_transfer_order/gen_other_out_data${params}`, opts);
//   });
// }
