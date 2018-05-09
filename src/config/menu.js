import * as consts from './const.js';

const menuData = [
  {
    name: '采购订单',
    icon: 'copy',
    path: `${consts.routePrefix}purchaseOrders`,
    key: 'purchaseOrders',
  },
  {
    name: '采购入库',
    icon: 'code-o',
    path: '',
    key: 'purchaseIn',
    children: [
      {
        name: '普通入库',
        icon: ' ',
        parentKey: 'purchaseIn',
        parentName: '采购入库',
        path: `${consts.routePrefix}commonInbound`,
        key: 'commonInbound',
      },
      {
        name: '采购退货',
        icon: '',
        path: `${consts.routePrefix}purchaseReturn`,
        parentKey: 'purchaseIn',
        parentName: '采购入库',
        key: 'purchaseReturn',
      },
    ],
  },
  // 付款单
  {
    name: '付款单',
    icon: 'pay-circle-o',
    key: 'paymentOrders',
    children: [{
      name: '采购预付',
      icon: ' ',
      parentName: '付款单',
      parentKey: 'paymentOrders',
      path: `${consts.routePrefix}purchaseAdvance`,
      key: 'purchaseAdvance',
    }, {
      name: '采购付款',
      icon: '',
      path: `${consts.routePrefix}purchasePayment`,
      parentKey: 'paymentOrders',
      parentName: '付款单',
      key: 'purchasePayment',
    }, {
      name: '采购退款',
      icon: '',
      path: `${consts.routePrefix}purchaseRefunds`,
      parentKey: 'paymentOrders',
      parentName: '付款单',
      key: 'purchaseRefunds',
    }],
  },
  {
    name: '取消订单',
    icon: 'book',
    path: `${consts.routePrefix}cancleOrders`,
    key: 'cancleOrders',
  },
  // 调拨单据
  {
    name: '调拨单据',
    icon: 'select',
    path: '',
    key: 'transferReceipt',
    children: [
      {
        name: '内部调拨',
        icon: ' ',
        parentKey: 'transferReceipt',
        parentName: '调拨单据',
        path: `${consts.routePrefix}transferReceipt/transferReceiptInternal`,
        key: 'transferReceiptInternal',
      },
      {
        name: '采购入库',
        icon: ' ',
        parentKey: 'transferReceipt',
        parentName: '调拨单据',
        path: `${consts.routePrefix}transferReceipt/purchaseOrderInbound`,
        key: 'purchaseOrderInbound',
      },
      {
        name: '销售出库',
        icon: ' ',
        parentKey: 'transferReceipt',
        parentName: '调拨单据',
        path: `${consts.routePrefix}transferReceipt/salesOutbound`,
        key: 'salesOutbound',
      },
    ],
  },
  // 其他出入库
  {
    name: '其他出入库',
    icon: 'bar-chart',
    path: '',
    key: 'otherInventory',
    children: [
      {
        name: '其他出库',
        icon: ' ',
        parentKey: 'otherInventory',
        parentName: '其他出入库',
        path: `${consts.routePrefix}otherInventory/outbound`,
        key: 'otherInventoryOutbound',
      },
      {
        name: '其他入库',
        icon: ' ',
        parentKey: 'otherInventory',
        parentName: '其他出入库',
        path: `${consts.routePrefix}otherInventory/inbound`,
        key: 'otherInventoryInbound',
      },
    ],
  },
  // FBA调拨
  {
    name: 'FBA调拨',
    icon: 'select',
    path: '',
    key: 'FBATransfer',
    children: [
      {
        name: 'FBA调拨台账',
        icon: ' ',
        parentKey: 'FBATransfer',
        parentName: 'FBA调拨',
        path: `${consts.routePrefix}FBATransfer/account`,
        key: 'FBATransferAccount',
      },
      {
        name: 'FBA调拨汇总',
        icon: ' ',
        parentKey: 'FBATransfer',
        parentName: 'FBA调拨',
        path: `${consts.routePrefix}FBATransfer/sum`,
        key: 'FBATransferSum',
      },
      {
        name: 'FBA调拨核销',
        icon: ' ',
        parentKey: 'FBATransfer',
        parentName: 'FBA调拨',
        path: `${consts.routePrefix}FBATransfer/verification`,
        key: 'FBATransferVerification',
      },
    ],
  },
  // 非FBA仓调拨
  {
    name: '非FBA仓调拨',
    icon: 'right-square-o',
    path: '',
    key: 'overseasTransfer',
    children: [
      {

        name: '非FBA仓调拨明细',
        icon: ' ',
        parentKey: 'overseasTransfer',
        parentName: '非FBA仓调拨',
        path: `${consts.routePrefix}overseasTransfer/detail`,
        key: 'overseasTransferDetail',
      },
      {
        name: '非FBA仓核销',
        icon: ' ',
        parentKey: 'overseasTransfer',
        parentName: '海外仓调拨',
        path: `${consts.routePrefix}overseasTransfer/verification`,
        key: 'overseasTransferVerification',
      },
    ],
  },
  // 跨法人调拨
  {
    name: '跨法人调拨',
    icon: 'form',
    path: '',
    key: 'corporateTransfer',
    children: [
      {

        name: '跨法人调拨明细',
        icon: ' ',
        parentKey: 'corporateTransfer',
        parentName: '跨法人调拨',
        path: `${consts.routePrefix}corporateTransfer/detail`,
        key: 'corporateTransferDetail',
      },
      {
        name: '报关单数据',
        icon: ' ',
        parentKey: 'corporateTransfer',
        parentName: '跨法人调拨',
        path: `${consts.routePrefix}corporateTransfer/customsDeclarationData`,
        key: 'customsDeclarationData',
      },
    ],
  },
  {
    name: '销毁报表',
    icon: 'file-excel',
    path: `${consts.routePrefix}destroyReport`,
    key: 'destroyReport',
  },
  {
    name: '亚马逊盘点',
    icon: 'calculator',
    path: `${consts.routePrefix}amazonInventory`,
    key: 'amazonInventory',
  },

  {
    name: '出入库明细',
    icon: 'solution',
    path: `${consts.routePrefix}inventoryRecord`,
    key: 'inventoryRecord',
  },
  {
    name: '业务类型维护',
    icon: 'api',
    path: `${consts.routePrefix}businessTypeMaintenance`,
    key: 'businessTypeMaintenance',
  },
  // 其他费用
  {
    name: '其他费用',
    icon: 'table',
    path: '',
    key: 'otherCost',
    children: [
      {
        name: '运费',
        icon: ' ',
        parentKey: 'otherCost',
        parentName: '其他费用',
        path: `${consts.routePrefix}freight`,
        key: 'freight',
      },
      {
        name: '留抵',
        icon: ' ',
        parentKey: 'otherCost',
        parentName: '其他费用',
        path: `${consts.routePrefix}overpaidVAT`,
        key: 'overpaidVAT',
      },
    ],
  },
];

export default menuData;
