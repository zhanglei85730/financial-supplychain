import React from 'react';
import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import * as util from '../../utils/util.js';
import { connect } from 'dva';
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
  allWarehouse,
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
      id: 'legalPersonId',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '法人主体',
      formCol,
      data: allCorporation.map((item, index) => {
        return { value: item.corporationId, key: index, text: item.corporationName };
      }),
    }, {
      label: '仓库名称',
      id: 'warehouseId',
      type: 'select',
      formCol,
      data: allWarehouse.map((item, index) => {
        if (util.hasProperty(item, 'stockId')) {
          return { value: item.stockId, key: index, text: item.name };
        }
      }),
    }],
  ];
  const collapseFormItemsConfig = [
    // 第二行
    [{
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
      placeholder: consts.supplierPlaceholder,
      formCol: { md: 0 },
    }, {
      id: 'payWay',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '结算方式',
      formCol: { ...collapseFormCol },
      data: allPaymentMethod.map((item, index) => {
        return { value: item.paymentMethodId, key: index, text: item.method };
      }),
    }, {
      id: 'currency',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '币别',
      formCol: { ...collapseFormCol },
      data: currency,
    }],
    // 第三行
    [{
      label: '采购单号',
      type: 'text',
      id: 'purchaseOrderId',
      formCol: { ...collapseFormCol },
    }, {
      label: '退货单号',
      type: 'text',
      id: 'returnOrderId',
      formCol: { ...collapseFormCol },
    }, {
      label: 'SKU',
      type: 'text',
      id: 'sku',
      formCol: { ...collapseFormCol },
    }],
    // 第四行
    [{
      label: 'UPC',
      type: 'text',
      id: 'upc',
      formCol: { ...collapseFormCol },
    }, {
      label: '采购人',
      type: 'text',
      id: 'buyerName',
      formCol: { ...collapseFormCol },
    }, {
      id: 'orgId',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '事业部',
      formCol: { ...collapseFormCol },
      data: allOrg.map((item) => {
        return { value: item.name, text: item.name };
      }),
    }],
    // 第四行
    [{
      label: '单据号',
      type: 'text',
      id: 'voucherNumber',
      formCol: { ...collapseFormCol },
    }, {
      label: '单据状态',
      type: 'select',
      id: 'voucherStatus',
      data: util.jsonToSelectOptions(allVoucherStatus),
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
  const marmginRight = { margin: '10px' };
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
            pushEasName={`${packageConst.pushEasName}`}
            modelNameSapce="common"
            selectedRowsArr={selectedRowsArr}
            pushEasResponse={pushEasResponse}
            buttonType="primary"
            style={marmginRight}
          />
          <GlobalExportForm
            url={`${consts.domain}/api/getReturnOrderList/export`}
            form={form}
            dispatch={dispatch}
            reduceName="commonInbound/exportInputsReduce"
            exportInputs={exportInputs}
          />
        </Col>
      </Row>
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
function mapStateToProps({ common, purchaseReturn }) {
  const { loading, selectedRowsArr, exportInputs } = purchaseReturn;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
