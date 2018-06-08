import moment from 'moment';

export default {
  // 正式接口地址
  domain: 'http://financial-supplychain.aukeyit.com',
  // domain: 'http://192.168.25.64:9102', // 刘婷
  // 销售数据
  domainSaleData: 'http://financial-fba-inventory.aukeyit.com', // 谢
  // 默认table数据
  defaultTableData: {
    data: {
      total: 0, rows: [],
    },
  },
  defaultTableDataRowsTotal: {
    rows: [],
    total: 0,
  },
  // 本地开发websocket
  // wsUrl: 'ws://192.168.25.160:9102',
  // 开发部署到域名
  // thisDomain: 'http://financial-supplychain-web.aukeyit.com/',
  // fba仓库维护、SKU部门维护(谢)http://financial-fba-inventory.aukeyit.com http://192.168.25.236:9099
  domainFabStorehouseMaintenance: 'http://financial-fba-inventory.aukeyit.com',
  // 业务类型维护(吴耿锋)  http://kis-supplychain.aukeyit.com http://192.168.25.125:9252
  domainBusinessTypeMaintenance: 'http://kis-supplychain.aukeyit.com',
  // 销售出库(吴耿锋)  http://kis-supplychain.aukeyit.com http://192.168.25.125:9252
  domainSalesOutboundCount: 'http://kis-supplychain.aukeyit.com',
  // 出入库明细、其他出入库、销售退货(吴树添)http://192.168.25.34:9104
  domainInventory: 'http://eas-pull-view.aukeyit.com',
  // 非FBA调拨(刘婷)(http://192.168.25.64:9099) http://10.1.1.204:9099
  domainOverseasTransfer: 'http://192.168.25.64:9099',
  // FBA调拨(彭长权) //http://192.168.25.234:9099 http://10.1.1.204:9099
  domainFbaWarehouseAllotLedger: 'http://10.1.1.204:9099',
  // 销毁报表(鲁重义)192.168.25.68:9299 
  domainDestroyReport: 'http://10.1.1.204:9299',
  // 跨法人调拨(伊元辉)
  domainCorporateTransfer: 'http://legal-allot.aukeyit.com',
  // domainCorporateTransfer: 'http://192.168.25.69:9095',
  // 亚马逊盘点(谢犇)http://192.168.25.236:9099
  domainAmazonInventory: 'http://financial-fba-inventory.aukeyit.com',
  // 调拨单据(秦宗列)
  // domainTransferReceiptInternal: 'http://192.168.25.70:9095 http://legal-allot.aukeyit.com',
  domainTransferReceiptInternal: 'http://192.168.25.70:9095',
  mockDomain: 'http://localhost:8000',
  routePrefix: '/',
  // 正式websocket
  // wsUrl: 'ws://10.1.1.204:8091',
  // 刘婷
  wsUrl: 'ws://192.168.25.64:9099',
  // 正式websocket(http://legal-allot.aukeyit.com)(调拨单据、跨法人调拨模块)
  wsUrl2: 'ws://10.1.1.204:9095',
  // 其他出入库、出入库明细（吴树添）
  wsUrl3: 'ws://10.1.1.204:9104',
  // 销售出库（吴耿锋）
  wsUrl4: 'ws://10.1.1.204:9251',
  // 测试websocket
  //10.1.1.204:8091
  // domain: 'http://localhost:8000',
  // 本地测试
  // http://www.aukeyit.com/login
  // domain: 'http://192.168.25.56:8010',
  tableScrollY: 860,
  //服务端返回的table分页条数
  limit: 20,
  // 返回pageSize额外条数 用于求和行
  extraPageSize: 2,
  defaultPageSize: 20,
  pageSizeOptions: ['20', '50', '100'],
  // 登录地址
  loginUrl: 'http://www.aukeyit.com/login',
  // search form config
  // 单据日期
  createDate: {
    title: '单据日期',
    key: 'createDate',
    dataIndex: 'createDate',
  },
  // 设置翻页显示总计条数
  GlobalShowTotal: (total) => {
    return `共 ${total} 条`;
  },
  // 计量单位
  unitPcs: (value, row, index) => {
    if (row.createDate === '本页合计' || row.createDate === '全部合计' ||
      row.billDate === '本页合计' || row.billDate === '全部合计') {
      return '';
    }
    return 'pcs';
  },
  globalTableScroll: { y: 700 },
  // globalTableScroll: {},
  // 凭证状态/单据状态
  voucherStatusRender: (value) => {
    let type = '';
    switch (value) {
      case '0':
        type = '待推送EAS';
        break;
      case '1':
        type = '推送成功';
        break;
      case '2':
        type = '推送失败';
        break;
      case '3':
        type = '待推送EAS-删除原凭证)';
        break;
      default:
        type = '';
    }
    return type;
  },
  // 付款方式 table render
  globalPayType: (value) => {
    let type = '';
    switch (value) {
      case '1':
        type = '支付宝';
        break;
      case '2':
        type = '银行转账';
        break;
      case '3':
        type = '现金支付';
        break;
      case '4':
        type = '第三方编号';
        break;
      default:
        type = value;
    }
    return type;
  },
  // 采购退款付款方式 table render
  purchaseRefundsPayType: (value) => {
    let type = '';
    switch (value) {
      case '0':
        type = '现金';
        break;
      case '1':
        type = '银行转账';
        break;
      case '2':
        type = '支付宝';
        break;
      case '3':
        type = '留抵';
        break;
      default:
        type = value;
    }
    return type;
  },
  // 含税 table render
  isTax: (value) => {
    let type = '';
    switch (value) {
      case '0':
        type = '否';
        break;
      case '1':
        type = '是';
        break;
      default:
        type = value;
    }
    return type;
  },
  // 日期格式化为 YYYY-MM-DD
  dateFormat: (value) => {
    if (!value) {
      return '';
    }
    return moment(value).format('YYYY-MM-DD');
  },
  colorRed: '#ff4d4f',
  // select 通用props
  selectProps: {
    maxTagCount: 1,
    mode: 'multiple',
  },
  // 返回固定值,除最后两行合计字段
  renderValue: (value, row, index) => {
    if (row.billDate === '本页合计' || row.billDate === '全部合计' ||
      row.createDate === '本页合计' || row.createDate === '全部合计') {
      return '';
    }
    return value;
  },
  // 排除合计字段 是返回true,不是返回false
  isSumFields: (row) => {
    if (row.createDate === '本页合计' || row.createDate === '全部合计' ||
      row.billDate === '本页合计' || row.billDate === '全部合计') {
      return true;
    } else {
      return false;
    }
  },
  // 右对齐
  align: 'right',
  // 推送金蝶modalstyle
  pushEasModalStyle: { minheight: '200px', maxheight: '500px', overflow: 'auto' },
  inputPlaceholder: '如果批量请用逗号隔开',
  supplierPlaceholder: '请选择供应商',
  // 截取部门
  fixedDepartment: (value) => {
    if (value) {
      try {
        const result = value.match(/[^-]+/);
        if (result !== null && Array.isArray(result)) {
          return result[0];
        }
      } catch (e) {
        return value;
      }
    }
  },
};
