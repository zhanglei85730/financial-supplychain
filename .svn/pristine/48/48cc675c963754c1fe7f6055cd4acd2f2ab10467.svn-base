import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';

// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const { billTime = '2018-01' } = payload;
    Object.assign(payload, { billTime });
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainSalesOutboundCount}/salesStock/list${params}`, opts);
  });
}
// // table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const params = util.params(util.deleteJsonEmptyProps(payload), '?');
    return request(`${consts.domainSalesOutboundCount}/salesStock/sumList${params}`, opts);
  });
}
// 查询单据状态
export function getBillStatus() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainSalesOutboundCount}/salesStock/getBillStatus`, opts);
  });
}
// 查询站点
export function getSite() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainSalesOutboundCount}/salesStock/getSite`, opts);
  });
}
// 查询客服
export function getCustomer() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainSalesOutboundCount}/salesStock/getCustomer`, opts);
  });
}
// 查询成本中心
export function getCostCenter() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainSalesOutboundCount}/salesStock/getCostCenter`, opts);
  });
}
// 查询部门
export function getOrg() {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    return request(`${consts.domainSalesOutboundCount}/salesStock/getOrg`, opts);
  });
}


