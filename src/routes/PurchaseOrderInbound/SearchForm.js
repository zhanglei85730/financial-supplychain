import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import * as util from '../../utils/util.js';
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
      type: 'rangePicker',
      id: 'billDateSection',
      formCol,
    }, {
      label: '供应商',
      id: 'supplierName',
      type: 'text',
      formCol,
      placeholder: consts.supplierPlaceholder,
      onClick: function () {
        dispatch({ type: 'common/supplierModalVisibileReduce', payload: true });
        dispatch({ type: 'common/getAllSupplier' });
      },
    },
    {
      label: '供应商id',
      id: 'supplierId',
      type: 'text',
      formCol: { md: 0 },
    }, {
      label: '部门',
      id: 'departName',
      // 同select属性,可以附加 select的属性
      type: 'select',
      formCol,
      // input数据
      data: allCorporation.map((item, index) => {
        return { value: item.corporationId, key: index, text: item.corporationName };
      }),
    }],
  ];
  const collapseFormItemsConfig = [
    // 第二行
    [{
      label: '报关单号',
      type: 'text',
      id: 'declareOrderId',
      formCol: { ...collapseFormCol },
    }, {
      label: '付款方式',
      id: 'payMethod',
      type: 'select',
      formCol: { ...collapseFormCol },
      data: currency,
    }, {
      label: '币别',
      id: 'currency',
      type: 'select',
      formCol: { ...collapseFormCol },
      data: currency,
    }],
    // 第三行
    [{
      label: 'SKU',
      type: 'text',
      id: 'sku',
      formCol: { ...collapseFormCol },
    }, {
      label: 'UPC',
      type: 'text',
      id: 'upc',
      formCol: { ...collapseFormCol },
    }, {
      label: '单据状态',
      type: 'select',
      id: 'status',
      formCol: { ...collapseFormCol },
      data: util.jsonToSelectOptions(allVoucherStatus),
    }],
    [{
      label: '单据号',
      id: 'number',
      formCol: { md: 8 },
      type: 'text',
    }, {
      type: 'custom',
      formCol: { md: 16 },
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
  const marmginSpace = { margin: '0 12px' };
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
            url={`${consts.domainTransferReceiptInternal}/api/getPrepaidOrderList/export`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            buttonType="primary"
          />
          <Button style={marmginSpace}>撤销审核</Button>
          <PushEas
            buttonText="推送到金蝶"
            dispatch={dispatch}
            modalShowReduce="common/pushEasModalRedece"
            pushReduce="common/pushEas"
            form={form}
            pushEasName={`${packageConst.pushEasName}`}
            modelNameSapce="common"
            selectedRowsArr={selectedRowsArr}
            pushEasResponse={pushEasResponse}
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
const SearchFormWrapped = Form.create()(SearchForm);

function mapStateToProps({ common, purchaseOrderInbound }) {
  const { loading, selectedRowsArr, exportInputs } = purchaseOrderInbound;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
