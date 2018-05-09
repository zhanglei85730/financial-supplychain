const Mock = require('mockjs');

let db = Mock.mock({
  // 'data|30-66': [{
  //   // 'fileName': '@id',
  //   // 'departName': '@name',
  //   // 'accountCode|18-32': 1,
  //   'fileName|1': ['小包-wish品类组', ' 小包-wish账号组', ' 小包-wish账号组'],
  //   'departName|1': ['小包-义乌A组', ' 小包-wish账号组', ' 小包-义乌B组'],
  //   'accountCode|1': ['onemoregood', 'Shuibaobao', 'spacecraft'],
  //   'reportStatus|1': Boolean,
  //   'accountCode|1': ['onemoregood', 'Shuibaobao', 'spacecraft'],
  //   'createdTimeStamp|1': ['2017-10-20', '2015-05-10', '2016-05-28'],
  //   'userName|1': ['onemoregood', 'Shuibaobao', 'spacecraft'],
  //   'verifyDate|1': ['2017-10-20', '2015-05-10', '2016-05-28'],
  //   'id|1': '@id',
  // }],

  success: true,
  "message": null,
  "data": {
    total: 60,
    'rows|9': [{
      'orgId|1': ['小包-wish品类组', ' 小包-wish账号组', ' 小包-wish账号组'],
      'nondefectiveNumber|1': [10, 10, 10],
      'vendorName|1': ['onemoregood', 'Shuibaobao', 'spacecraft'],
      'status|1': Boolean,
      'accountCode|1': ['onemoregood', 'Shuibaobao', 'spacecraft'],
      'eliveryDate|1': ['2017-10-20', '2015-05-10', '2016-05-28'],
      'unitPrice|1': [50, 60, 100],
      'verifyDate|1': ['2017-10-20', '2015-05-10', '2016-05-28'],
      'id|1': '@id',
    }]
  },
});
// FBA调拨台账
let fbaTransferAccount = Mock.mock({
  success: true,
  "message": null,
  "data": {
    total: 60,
    'rows|9': [{
      'legalEntityName|1': ['小包-wish品类组', ' 小包-wish账号组', ' 小包-wish账号组'],
      'operateDate|1': ['2018-05-20', '2018-05-10', '2018-05-05'],
      'departmentName|1': ['小包-wish品类组', ' 小包-wish账号组', ' 小包-wish账号组'],
      'amazonAccountName|1': ['123@test.com', 'abc@test.com', 'ooo@test.com'],
      'amazonSiteGroupId|1': ['onemoregood', 'Shuibaobao', 'spacecraft'],
      'shipmentId|1': Boolean,
      'fnsku|1': ['fewfw', '45661565', 'aewfew'],
      'shipmentItemId|1': [125461213, 854531, 5853131],
      'outputWarehouseName|1': ['efwonemoregood', 'Sfhuibaobao', 'fewspacecraft'],
      'certificationQuantity|1': [100, 200, 300],
      'id|1': '@id',
    }]
  },
});
module.exports = {
  ['GET /api/getPurchaseOrderList'](req, res) {   
    res.status(200).json(db);
  },
  // FBA调拨台账
  ['GET /api/fba_warehouse_allot_ledger/search'](req, res) {    
    res.status(200).json(fbaTransferAccount);
  },
  //get方式根据查询条件返回数据
  ['GET /api/downloadDetail/search'](req, res) {
    const accounts = req.query.accounts;
    const responseData = db.data.filter((item) => {
      if (item.accountCode === accounts) {
        return item;
      }
    });
    res.status(200).json({ data: responseData });
  },
  ['POST /api/users'](req, res) {
    let user = req.body;
    console.log(req);
    user.id = Mock.mock('@id');
    db.data.push(user);
    res.status(200).json(user);
  },
  // 登录模拟
  ['get /api/login'](req, res) {
    const { userName, password } = req.query;
    const isAuthorized = (userName === 'zl' && password === '30') ? true : false;
    res.status(200).json({ logined: isAuthorized });
  },
};
