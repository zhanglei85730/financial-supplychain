import React from 'react';
import moment from 'moment';
import { Form, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import FormButtons from './FormButtons.js';
import consts from '../../config/const.js';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';
import PushEasModal from '../../components/PushEasModal/PushEasModal.js';
import GlobalExportForm from '../../components/GlobalExportForm/GlobalExportForm.js';
import PushEas from '../../components/PushEas/PushEas.js';
import AllSupplier from '../../components/AllSupplier/AllSupplier.js';
import packageConst from './packageConst.js';
import { jsonToSelectOptions } from '../../utils/util.js';

function SearchForm({
  dispatch,
  formCollapse,
  form,
  allVoucherStatus,
  supplierModalVisibile,
  supplierList,
  supplierSearchList,
  supplierTableLoading,
  supplierSelect,
  loading,
  pushEasResponse,
  selectedRowsArr,
  exportInputs,
  globalPagationParam,
  billStatus,
  site,
  customer,
  getOrg,
  getCostCenter
   }) {
  const formCol = formCollapse ? { md: 8, sm: 24 } : { md: 6, sm: 24 };
  const collapseFormCol = { md: 8, sm: 24 };
  const buttonsCol = {
    type: 'custom',
    formCol,
    component: <FormButtons
      form={form}
      dispatch={dispatch}
      formCollapse={formCollapse}
      loading={loading}
    />,
  };
  const formItemsConfig = [
    // 第一行
    [{
      label: '单据时间',
      type: 'datePicker',
      id: 'billTime',
      formCol,
      defaultValue: moment('2018/01', 'YYYY-MM'),
      // format: 'YYYY-MM',
      subType: 'monthPicker',
    },
    {
      label: '账号',
      id: 'account',
      type: 'text',
      formCol,
    },
    {
      id: 'departmentName',
      type: 'select',
      label: '部门',
      formCol,
      data: jsonToSelectOptions(getOrg, true),
    }],
  ];
  const voucherStatus = [];
  const voucherStatusObj = allVoucherStatus;

  // 单据状态返回的是json
  for (const key in voucherStatusObj) {
    voucherStatus.push({ value: key, text: voucherStatusObj[key] });
  }
  const collapseFormItemsConfig = [
    // 第二行
    [{
      label: '站点',
      type: 'select',
      id: 'site',
      formCol: { ...collapseFormCol },
      data: jsonToSelectOptions(site, true),
    }, {
      id: 'customer',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '客户',
      formCol: { ...collapseFormCol },
      data: jsonToSelectOptions(customer, true),
    }, {
      id: 'upc',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: 'UPC',
      formCol: { ...collapseFormCol },
    }],
    // 第三行
    [{
      label: 'SKU名称',
      type: 'text',
      id: 'sku',
      formCol: { ...collapseFormCol },
    }, {
      label: '订单号',
      type: 'text',
      id: 'orderNumber',
      formCol: { ...collapseFormCol },
    }, {
      label: '包裹号',
      type: 'text',
      id: 'packageNumber',
      formCol: { ...collapseFormCol },
    }],
    // 第四行
    [{
      label: '成本中心',
      type: 'select',
      id: 'costCenter',
      formCol: { ...collapseFormCol },
      data: jsonToSelectOptions(getCostCenter, true),
    }, {
      label: '单据号',
      type: 'text',
      id: 'billNumber',
      formCol: { ...collapseFormCol },
    }, {
      id: 'billStatus',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '单据状态',
      formCol: { ...collapseFormCol },
      data: jsonToSelectOptions(billStatus),
    },
    ],
    [{
      type: 'custom',
      formCol: { md: 24 },
      component: <FormButtons
        form={form}
        dispatch={dispatch}
        formCollapse={formCollapse}
      />,
    }],
  ];
  let formItemsResult = formItemsConfig;
  // form展开
  if (!formCollapse) {
    const formItemsConfigLastNode = formItemsConfig[formItemsConfig.length - 1];
    formItemsResult = [formItemsConfigLastNode.concat([buttonsCol])];
  }
  const toolMarginTop = { marginTop: '20px' };
  const marmginRight = { marginRight: '10px' };
  return (
    <span>
      <GlobalSearchForm
        formItems={formItemsResult}
        formCollapse={formCollapse}
        collapseFormItems={collapseFormItemsConfig}
        dispatch={dispatch}
        form={form}
      />
      <Row>
        <Col style={toolMarginTop}>
          <PushEas
            buttonText="推送到金蝶"
            dispatch={dispatch}
            modalShowReduce="common/pushEasModalRedece"
            pushReduce="common/pushEas"
            form={form}
            moduleModelNameSapce={`${packageConst.modelNameSapce}`}
            modelNameSapce="common"
            selectedRowsArr={selectedRowsArr}
            pushEasResponse={pushEasResponse}
            buttonType="primary"
            wsUrl={`${consts.wsUrl4}/socket`}
            style={marmginRight}
            pushEasUrl={`${consts.domainSalesOutboundCount}/salesStock/pushEas`}
            dateStartFormat="YYYY-MM"
            fetchUUIDUrl={`${consts.domainSalesOutboundCount}/salesStock/fetchUUID`}
            rowId="countId"
          />
          <GlobalExportForm
            url={`${consts.domainSalesOutboundCount}/salesStock/exportDetail`}
            form={form}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            exportInputs={exportInputs}
            buttonText='导出明细'
            style={marmginRight}
          />
          <GlobalExportForm
            url={`${consts.domainSalesOutboundCount}/salesStock/export`}
            form={form}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            exportInputs={exportInputs}
            style={marmginRight}
          />
        </Col>
      </Row>
      {/* 所有供应商 */}
      <AllSupplier
        isVisibile={supplierModalVisibile}
        dispatch={dispatch}
        supplierList={supplierList}
        form={form}
        supplierSearchList={supplierSearchList}
        supplierTableLoading={supplierTableLoading}
        supplierSelect={supplierSelect}
      />
      <PushEasModal
        dispatch={dispatch}
        refreshTableRedece={`${packageConst.modelNameSapce}/tableData`}
        globalPagationParam={globalPagationParam}
      />
    </span>
  );
}
SearchForm.PropTypes = {
  allOrg: PropTypes.array,
  currency: PropTypes.array,
  allCorporation: PropTypes.array,
  allPaymentMethod: PropTypes.array,
  allVoucherStatus: PropTypes.object,
  supplierModalVisibile: PropTypes.bool,
  supplierTableLoading: PropTypes.bool,
  globalPagationParam: PropTypes.object,
  exportInputs: PropTypes.object,
  selectedRowsArr: PropTypes.array,
  loading: PropTypes.bool,
};
const SearchFormWrapped = Form.create(consts.formCreateOptions)(SearchForm);
function mapStateToProps({ common, salesOutboundCount }) {
  const { loading, selectedRowsArr, exportInputs, billStatus, site, customer, getOrg, getCostCenter } = salesOutboundCount;
  return { ...common, loading, selectedRowsArr, exportInputs, billStatus, site, customer, getOrg, getCostCenter };
}
export default connect(mapStateToProps)(SearchFormWrapped);
