import dva from 'dva';
// 地址栏有#
import { browserHistory } from 'dva/router';
// createHistory(地址栏无#)
// import createHistory from 'history/createBrowserHistory';
import './index.css';

const app = dva({
  // 地址栏无#
  // history: createHistory(),
  // 地址栏有#
  history: browserHistory,
});
app.model(require('./models/mainLayout'));
app.model(require("./models/skuDepartmentMaintenance"));
app.model(require("./models/calAgainProcess"));
app.model(require("./models/edStorehouseMaintenance"));
app.model(require("./models/purchaseOrderInbound"));
app.model(require("./models/fabStorehouseMaintenance"));
app.model(require("./models/factVerificationOutbound"));
app.model(require("./models/salesVerificationList"));
app.model(require("./models/waitOutbound"));
app.model(require("./models/differentMachineAccount"));
app.model(require("./models/businessTypeMaintenance"));
app.model(require("./models/customsDeclarationData"));
app.model(require("./models/corporateTransferDetail"));
app.model(require("./models/otherInventoryOutbound"));
app.model(require("./models/salesOutbound"));
app.model(require("./models/transferReceiptInternal"));
app.model(require("./models/inventoryRecord"));
app.model(require("./models/destroyReport"));
app.model(require("./models/amazonInventory"));
app.model(require('./models/overseasTransferVerification'));
app.model(require('./models/overseasTransferDetail'));
app.model(require('./models/fbaTransferVerification'));
app.model(require('./models/fabTransferSum'));
app.model(require('./models/fbaTransferAccount'));
app.model(require('./models/cancleOrders'));
app.model(require('./models/purchaseOrders'));
app.model(require('./models/purchaseAdvance'));
app.model(require('./models/purchaseRefunds'));
app.model(require('./models/purchaseReturn'));
app.model(require('./models/commonInbound'));
app.model(require('./models/sideMenu'));
app.model(require('./models/downloadDetail'));
app.model(require('./models/common.js'));
app.model(require('./models/globalHeader'));
app.model(require('./models/login.js'));
app.model(require('./models/purchasePayment'));
app.model(require('./models/freight'));
app.model(require('./models/overpaidVAT'));
app.model(require("./models/otherInventoryInbound"));
// 4. Router
app.router(require('./router'));
// 5. Start
app.start('#root');

