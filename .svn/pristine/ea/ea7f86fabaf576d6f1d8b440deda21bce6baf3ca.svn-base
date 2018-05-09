import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import FormButtons from './FormButtons.js';
import consts from '../../config/const.js';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';
import GlobalExportForm from '../../components/GlobalExportForm/GlobalExportForm.js';
import packageConst from './packageConst.js';
import { jsonToSelectOptions } from '../../utils/util.js';

function SearchForm({
  dispatch,
  formCollapse,
  form,
  currency,
  allCorporation,
  allPaymentMethod,
  allVoucherStatus,
  loading,
  exportInputs,
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
      label: '出库时间',
      type: 'rangePicker',
      id: 'queryDate',
      formCol,
    },
    {
      label: '调拨单号',
      id: 'supplierName',
      type: 'text',
      formCol,
    },
    {
      id: 'legalPersonId',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '状态',
      formCol,
      // input数据
      data: allCorporation.map((item, index) => {
        return { value: item.corporationId, key: index, text: item.corporationName };
      }),
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
      label: 'SKU',
      type: 'text',
      id: 'purchaseOrderId',
      formCol: { ...collapseFormCol },
    }, {
      id: 'payWay',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '出库仓',
      formCol: { ...collapseFormCol },
      data: allPaymentMethod.map((item, index) => {
        return { value: item.paymentMethodId, key: index, text: item.method };
      }),
    }, {
      id: 'currency',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '入库仓',
      formCol: { ...collapseFormCol },
      data: currency,
    }],
    // 第三行
    [{
      id: 'site',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '运输方式',
      formCol: { ...collapseFormCol },
      data: currency,
    }, {
      id: 'department',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '部门',
      formCol: { ...collapseFormCol },
      data: currency,
    }, {
      label: '核销单号',
      type: 'text',
      id: 'upc',
      formCol: { ...collapseFormCol },
    }],
    // 第四行
    [{
      label: '柜号',
      type: 'text',
      id: 'voucherNumber',
      formCol: { ...collapseFormCol },
    },
    {
      id: 'payWay',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '单据状态',
      formCol: { ...collapseFormCol },
      data: allPaymentMethod.map((item, index) => {
        return { value: item.paymentMethodId, key: index, text: item.method };
      }),
    }, {
      label: '单据号',
      type: 'text',
      id: 'voucherNumber',
      formCol: { ...collapseFormCol },
      placeholder: consts.inputPlaceholder,
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
          <GlobalExportForm
            url={`${consts.domain}/api/getPurchaseOrderList/export`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName="chaseOrders/exportInputsReduce"
            buttonType="primary"
            style={marmginRight}
          />
          <Button>核销</Button>
        </Col>
      </Row>
    </span>
  );
}
SearchForm.propTypes = {
  currency: PropTypes.array,
  allCorporation: PropTypes.array,
  allPaymentMethod: PropTypes.array,
  allVoucherStatus: PropTypes.object,
  exportInputs: PropTypes.object,
  loading: PropTypes.bool,
};
const OverseasTransferDetail = Form.create()(SearchForm);
function mapStateToProps({ common, overseasTransferDetail }) {
  const { loading, selectedRowsArr, exportInputs } = overseasTransferDetail;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(OverseasTransferDetail);
