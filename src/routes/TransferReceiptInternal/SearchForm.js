import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { jsonToSelectOptions, arrayToSelectOptions } from '../../utils/util.js';
import FormButtons from './FormButtons.js';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';
import GlobalExportForm from '../../components/GlobalExportForm/GlobalExportForm.js';
import PushEas from '../../components/PushEas/PushEas.js';
import AllSupplier from '../../components/AllSupplier/AllSupplier.js';
import PushEasModal from '../../components/PushEasModal/PushEasModal.js';
import consts from '../../config/const.js';
import packageConst from './packageConst.js';

function SearchForm({
  dispatch,
  formCollapse,
  form,
  allOrg,
  currency,
  allCorporation,
  allPaymentMethod,
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
  allFundsPayment,
  departNameIn,
  warehouseNameIn,
  warehouseNameOut,
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
      label: '单据日期',
      type: 'datePicker',
      id: 'billDateSection',
      formCol,
      format: 'YYYY-MM',
      subType: 'monthPicker',
    }, {
      label: '法人主体',
      id: 'legalName',
      // 同select属性,可以附加 select的属性
      type: 'select',
      formCol,
      // input数据
      data: allCorporation.map((item, index) => {
        return { value: item.corporationId, key: index, text: item.corporationName };
      }),
    }, {
      label: '调出仓库',
      id: 'warehouseNameOut',
      type: 'select',
      formCol,
      data: arrayToSelectOptions(warehouseNameOut),
    }],
  ];
  const collapseFormItemsConfig = [
    // 第二行
    [{
      label: '调入仓库',
      id: 'warehouseNameIn',
      type: 'select',
      formCol: { ...collapseFormCol },
      data: arrayToSelectOptions(warehouseNameIn),
    }, {
      label: 'SKU',
      id: 'sku',
      type: 'text',
      formCol: { ...collapseFormCol },
    }, {
      label: 'UPC',
      id: 'upc',
      type: 'text',
      formCol: { ...collapseFormCol },
    }],
    // 第三行
    [{
      label: '调拨单号',
      id: 'transferNo',
      type: 'text',
      formCol: { ...collapseFormCol },
    }, {
      label: '调入部门',
      type: 'select',
      id: 'departNameIn',
      formCol: { ...collapseFormCol },
      data: arrayToSelectOptions(departNameIn),
    }, {
      label: '调出部门',
      type: 'select',
      id: 'departNameOut',
      formCol: { ...collapseFormCol },
      data: arrayToSelectOptions(departNameIn).reverse(),
    }],
    [{
      label: '调拨日期',
      type: 'rangePicker',
      id: 'pushTimeSection',
      formCol: { ...collapseFormCol },
    }, {
      label: '单据号',
      type: 'text',
      id: 'number',
      formCol: { ...collapseFormCol },
    },
    {
      label: '单据状态',
      type: 'select',
      id: 'status',
      formCol: { ...collapseFormCol },
      data: jsonToSelectOptions(allVoucherStatus),
    }],
    [
      {
        type: 'custom',
        formCol: { md: 24 },
        component: <FormButtons
          form={form}
          dispatch={dispatch}
          formCollapse={formCollapse}
        />,
      },
    ],
  ];
  let formItemsResult = formItemsConfig;
  // form展开
  if (!formCollapse) {
    const formItemsConfigLastNode = formItemsConfig[formItemsConfig.length - 1];
    formItemsResult = [formItemsConfigLastNode.concat([buttonsCol])];
  }
  const toolMarginTop = { marginTop: '20px' };
  const marmginSpace = { marginLeft: '10px' };
  const approveDataHandle = (e) => {
    const target = e.target.id;
    let url = '';
    switch (target) {
      case 'revokeAudit':
        url = '/transfereout/revokeAudit';
        break;
      default:
        url = false;
    }
    if (!url) {
      return;
    }
    dispatch({
      type: 'common/commonApproveData',
      payload: {
        selectedRowsArr,
        paramKey: 'ids',
        url: `${consts.domainTransferReceiptInternal}/${url}`,
      },
    });
  };
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
          <GlobalExportForm
            url={`${consts.domainTransferReceiptInternal}/transfereout/exportExcel`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            buttonType="primary"
            isFormatDate={undefined}
            dateStartFormat='YYYYMM'
            buttonText="导出明细"
          />
          <GlobalExportForm
            url={`${consts.domainTransferReceiptInternal}/transfereout/exportMainExcel`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            isFormatDate={undefined}
            dateStartFormat='YYYYMM'
            style={marmginSpace}
          />
          {/* <Button style={marmginSpace} onClick={approveDataHandle} id="revokeAudit">撤销审核</Button> */}
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
            pushEasUrl={`${consts.domainTransferReceiptInternal}/transfereout/submitCertificate`}
            // pushEasUrlMethod="post"
            // websocket 请求地址
            wsUrl={`${consts.wsUrl2}/socket`}
            isFormatDate={undefined}
            dateStartFormat='YYYYMM'
            // uuid地址
            fetchUUIDUrl={`${consts.domainTransferReceiptInternal}/common/fetchUUID`}
            style={marmginSpace}
          // pushEasCondition="selectRows"
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
SearchForm.propTypes = {
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

function mapStateToProps({ common, transferReceiptInternal }) {
  const { loading, selectedRowsArr, exportInputs, departNameIn, warehouseNameIn, warehouseNameOut } = transferReceiptInternal;
  return { ...common, loading, selectedRowsArr, exportInputs, departNameIn, warehouseNameIn, warehouseNameOut };
}
export default connect(mapStateToProps)(SearchFormWrapped);
