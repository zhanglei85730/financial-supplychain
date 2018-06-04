import React from 'react';
import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import * as util from '../../utils/util.js';
import FormButtons from './FormButtons.js';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';
import GlobalExportForm from '../../components/GlobalExportForm/GlobalExportForm.js';
import PushEas from '../../components/PushEas/PushEas.js';
import AllSupplier from '../../components/AllSupplier/AllSupplier.js';
import consts from '../../config/const.js';
import PushEasModal from '../../components/PushEasModal/PushEasModal.js';
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
  allPayment,
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
      id: 'queryDate',
      formCol,
    }, {
      label: '供应商',
      id: 'supplierName',
      type: 'text',
      placeholder: consts.supplierPlaceholder,
      formCol,
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
      id: 'legalPersonId',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '法人主体',
      formCol,
      data: allCorporation.map((item, index) => {
        return { value: item.corporationId, key: index, text: item.corporationName };
      }),
    }],
  ];
  const collapseFormItemsConfig = [
    // 第二行
    [{
      label: '退款单号',
      type: 'text',
      id: 'refundOrderId',
      formCol: { ...collapseFormCol },
    }, {
      label: '采购单号',
      id: 'purchaseOrderId',
      type: 'text',
      formCol: { ...collapseFormCol },
    }, {
      label: '币别',
      id: 'currency',
      type: 'select',
      formCol: { ...collapseFormCol },
      data: currency,
    }],
    // 第三行
    [{
      label: '结算方式',
      type: 'select',
      id: 'payWay',
      formCol: { ...collapseFormCol },
      data: allPaymentMethod.map((item, index) => {
        return { value: item.paymentMethodId, key: index, text: item.method };
      }),
    }, {
      label: '付款方式',
      type: 'select',
      id: 'payType',
      formCol: { ...collapseFormCol },
      data: util.jsonToSelectOptions(allPayment),
    }, {
      label: '请款人',
      type: 'text',
      id: 'requester',
      formCol: { ...collapseFormCol },
    }],
    // 第四行
    [{
      label: '事业部',
      type: 'select',
      id: 'orgId',
      formCol: { ...collapseFormCol },
      data: allOrg.map((item) => {
        return { value: item.name, text: item.name };
      }),
    }, {
      label: '单据状态',
      type: 'select',
      id: 'voucherStatus',
      formCol: { ...collapseFormCol },
      data: util.jsonToSelectOptions(allVoucherStatus),
    }, {
      label: '单据号',
      id: 'voucherNumber',
      // 同select属性,可以附加 select的属性
      type: 'text',
      formCol: { ...collapseFormCol },
    }],
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
            modelNameSapce="common"
            selectedRowsArr={selectedRowsArr}
            pushEasResponse={pushEasResponse}
            buttonType="primary"
            style={marmginRight}
            moduleModelNameSapce={`${packageConst.modelNameSapce}`}
            wsUrl={`${consts.wsUrl}/socket`}
            pushEasUrl={`${consts.domain}/${packageConst.pushEasName}/pushEas`}
          />
          <GlobalExportForm
            url={`${consts.domain}/api/getRefundOrderList/export`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
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

function mapStateToProps({ common, purchaseRefunds }) {
  const { loading, selectedRowsArr, exportInputs } = purchaseRefunds;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
