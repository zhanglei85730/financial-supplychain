import PurchaseOrders from '../routes/PurchaseOrders/PurchaseOrders.js';
import CommonInbound from '../routes/CommonInbound/CommonInbound.js';
import PurchaseReturn from '../routes/PurchaseReturn/PurchaseReturn.js';
import PurchaseAdvance from '../routes/PurchaseAdvance/PurchaseAdvance.js';
import PurchaseRefunds from '../routes/PurchaseRefunds/PurchaseRefunds.js';
import PurchasePayment from '../routes/PurchasePayment/PurchasePayment.js';
import CancleOrders from '../routes/CancleOrders/CancleOrders.js';
import Freight from '../routes/Freight/Freight.js';
import OverpaidVAT from '../routes/OverpaidVAT/OverpaidVAT.js';
import FBATransferAccount from '../routes/FBATransferAccount/FBATransferAccount.js';
import FBATransferSum from '../routes/FBATransferSum/FBATransferSum.js';
import FBATransferVerification from '../routes/FBATransferVerification/FBATransferVerification.js';
import OverseasTransferDetail from '../routes/OverseasTransferDetail/OverseasTransferDetail.js';
import OverseasTransferVerification from '../routes/OverseasTransferVerification/OverseasTransferVerification.js';
import AmazonInventory from '../routes/AmazonInventory/AmazonInventory.js';
import DestroyReport from '../routes/DestroyReport/DestroyReport.js';
import InventoryRecord from '../routes/InventoryRecord/InventoryRecord.js';
import TransferReceiptInternal from '../routes/TransferReceiptInternal/TransferReceiptInternal.js';
import PurchaseOrderInbound from '../routes/PurchaseOrderInbound/PurchaseOrderInbound.js';
import SalesOutbound from '../routes/SalesOutbound/SalesOutbound.js';
import OtherInventoryOutbound from '../routes/OtherInventoryOutbound/OtherInventoryOutbound.js';
import OtherInventoryInbound from '../routes/OtherInventoryInbound/OtherInventoryInbound.js';
import CustomsDeclarationData from '../routes/CustomsDeclarationData/CustomsDeclarationData.js';
import CorporateTransferDetail from '../routes/CorporateTransferDetail/CorporateTransferDetail.js';
import BusinessTypeMaintenance from '../routes/BusinessTypeMaintenance/BusinessTypeMaintenance.js';

import * as consts from './const.js';

const pageStyle = {
  fontColor: { color: '#333' },
  fontSize: { fontSize: '20px' },
};
const { fontColor, fontSize } = pageStyle;
const titleCss = Object.assign(fontColor, fontSize);

const routes = [{
  path: `${consts.routePrefix}purchaseOrders`,
  title: '采购订单',
  key: 'purchaseOrders',
  sidebar: () => <div style={titleCss}>采购订单</div>,
  main: PurchaseOrders,
}, {
  path: `${consts.routePrefix}commonInbound`,
  title: '普通入库',
  key: 'commonInbound',
  sidebar: () => <div style={titleCss}>普通入库</div>,
  main: CommonInbound,
}, {
  path: `${consts.routePrefix}purchaseReturn`,
  title: '普通入库',
  key: 'purchaseReturn',
  sidebar: () => <div style={titleCss}>采购退货</div>,
  main: PurchaseReturn,
}, {
  path: `${consts.routePrefix}purchaseAdvance`,
  title: '普通入库',
  key: 'purchaseAdvance',
  sidebar: () => <div style={titleCss}>采购预付</div>,
  main: PurchaseAdvance,
}, {
  path: `${consts.routePrefix}purchasePayment`,
  title: '普通入库',
  key: 'purchasePayment',
  sidebar: () => <div style={titleCss}>采购付款</div>,
  main: PurchasePayment,
}, {
  path: `${consts.routePrefix}purchaseRefunds`,
  title: '采购退款',
  key: 'purchaseRefunds',
  sidebar: () => <div style={titleCss}>采购退款</div>,
  main: PurchaseRefunds,
}, {
  path: `${consts.routePrefix}cancleOrders`,
  title: '取消订单',
  key: 'cancleOrders',
  sidebar: () => <div style={titleCss}>取消订单</div>,
  main: CancleOrders,
},
// FBA调拨
{
  path: `${consts.routePrefix}FBATransfer/account`,
  title: 'FBA调拨台账',
  key: 'FBATransferAccount',
  sidebar: () => <div style={titleCss}>FBA调拨台账</div>,
  main: FBATransferAccount,
},
{
  path: `${consts.routePrefix}FBATransfer/sum`,
  title: 'FBA调拨汇总',
  key: 'FBATransferSum',
  sidebar: () => <div style={titleCss}>FBA调拨汇总</div>,
  main: FBATransferSum,
},
{
  path: `${consts.routePrefix}FBATransfer/verification`,
  title: 'FBA调拨核销',
  key: 'FBATransferVerification',
  sidebar: () => <div style={titleCss}>FBA调拨核销</div>,
  main: FBATransferVerification,
},
// 海外仓调拨
{
  path: `${consts.routePrefix}overseasTransfer/detail`,
  title: '非FBA仓调拨明细',
  key: 'overseasTransferDetail',
  sidebar: () => <div style={titleCss}>非FBA仓调拨明细</div>,
  main: OverseasTransferDetail,
},
{
  path: `${consts.routePrefix}overseasTransfer/verification`,
  title: '非FBA仓核销',
  key: 'overseasTransferVerification',
  sidebar: () => <div style={titleCss}>非FBA仓核销</div>,
  main: OverseasTransferVerification,
},
{
  path: `${consts.routePrefix}amazonInventory`,
  title: '亚马逊盘点',
  key: 'amazonInventory',
  sidebar: () => <div style={titleCss}>亚马逊盘点</div>,
  main: AmazonInventory,
},
{
  path: `${consts.routePrefix}destroyReport`,
  title: '销毁报表',
  key: 'destroyReport',
  sidebar: () => <div style={titleCss}>销毁报表</div>,
  main: DestroyReport,
},
{
  path: `${consts.routePrefix}inventoryRecord`,
  title: '出入库明细',
  key: 'warehouseRecord',
  sidebar: () => <div style={titleCss}>出入库明细</div>,
  main: InventoryRecord,
},
// 其他费用
{
  path: `${consts.routePrefix}freight`,
  title: '运费',
  key: 'freight',
  sidebar: () => <div style={titleCss}>运费</div>,
  main: Freight,
}, {
  path: `${consts.routePrefix}overpaidVAT`,
  title: '取消订单',
  key: 'overpaidVAT',
  sidebar: () => <div style={titleCss}>留抵</div>,
  main: OverpaidVAT,
},
// 调拨单据
{
  path: `${consts.routePrefix}transferReceipt/transferReceiptInternal`,
  title: '内部调拨',
  key: 'transferReceiptInternal',
  sidebar: () => <div style={titleCss}>内部调拨</div>,
  main: TransferReceiptInternal,
},
{
  path: `${consts.routePrefix}transferReceipt/purchaseOrderInbound`,
  title: '采购入库',
  key: 'purchaseOrderInbound',
  sidebar: () => <div style={titleCss}>采购入库</div>,
  main: PurchaseOrderInbound,
}, {
  path: `${consts.routePrefix}transferReceipt/salesOutbound`,
  title: '销售出库',
  key: 'calesOutbound',
  sidebar: () => <div style={titleCss}>销售出库</div>,
  main: SalesOutbound,
},
// 其他出入库
{
  path: `${consts.routePrefix}otherInventory/outbound`,
  title: '其他出库',
  key: 'otherInventoryOutbound',
  sidebar: () => <div style={titleCss}>其他出库</div>,
  main: OtherInventoryOutbound,
},
{
  path: `${consts.routePrefix}otherInventory/inbound`,
  title: '其他入库',
  key: 'otherInventoryInbound',
  sidebar: () => <div style={titleCss}>其他入库</div>,
  main: OtherInventoryInbound,
},
// 跨法人调拨
{
  path: `${consts.routePrefix}corporateTransfer/detail`,
  title: '跨法人调拨明细',
  key: 'corporateTransferDetail',
  sidebar: () => <div style={titleCss}>跨法人调拨明细</div>,
  main: CorporateTransferDetail,
},
{
  path: `${consts.routePrefix}corporateTransfer/customsDeclarationData`,
  title: '报关单数据',
  key: 'customsDeclarationData',
  sidebar: () => <div style={titleCss}>报关单数据</div>,
  main: CustomsDeclarationData,
},
{
  path: `${consts.routePrefix}businessTypeMaintenance`,
  title: '业务类型维护',
  key: 'businessTypeMaintenance',
  sidebar: () => <div style={titleCss}>业务类型维护</div>,
  main: BusinessTypeMaintenance,
},
];

export default routes;
