import request from '../utils/request';
import consts from '../config/const.js';
import * as util from '../utils/util.js';
// 加载table数据
export function fetchTableData(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    // const params = util.params(util.deleteJsonEmptyProps(payload));
    const { limit, offset } = payload;
    const params = util.params({ limit, offset });
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    return request(`${consts.domainTransferReceiptInternal}/saleout/findListByQuery?${params}`, opts);
  });
}
// table数据总计
export function getTableDataSum(payload) {
  return util.getSecurityHeaderFormLocal().then((opts) => {
    const payload = payload ? payload : {};
    Object.assign(opts, { method: 'post' }, { body: JSON.stringify(payload) });
    Object.assign(opts.headers, { 'Content-Type': 'application/json' });
    // const params = util.params(util.deleteJsonEmptyProps(payload));
    return request(`${consts.domainTransferReceiptInternal}/saleout/findFooter`, opts);
  });
}
