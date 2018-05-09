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
  allVoucherStatus,
  allOrg,
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
      label: '初始时间',
      type: 'rangePicker',
      id: 'queryDate',
      formCol,
    },
    {
      id: 'orgId',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '账号',
      formCol,
      data: allOrg.map((item) => {
        return { value: item.name, text: item.name };
      }),
    },
    {
      id: 'orgId',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '部门',
      formCol,
      data: allOrg.map((item) => {
        return { value: item.name, text: item.name };
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
      id: 'orgId',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '大区',
      formCol: { ...collapseFormCol },
      data: allOrg.map((item) => {
        return { value: item.name, text: item.name };
      }),
    }, {
      label: 'shipmentID',
      type: 'text',
      id: 'upc',
      formCol: { ...collapseFormCol },
    }, {
      label: 'FNSKU',
      type: 'text',
      id: 'upc',
      formCol: { ...collapseFormCol },
    }],
    // 第三行
    [{
      id: 'site',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '核销状态',
      formCol: { ...collapseFormCol },
      data: currency,
    }, {
      label: '单据号',
      type: 'text',
      id: 'upc',
      formCol: { ...collapseFormCol },
    }, {
      id: 'department',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '单据状态',
      formCol: { ...collapseFormCol },
      data: currency,
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
  const marmginLeft = { marginLeft: '10px' };
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
          />
          <Button style={marmginLeft}>审核</Button>
          <Button style={marmginLeft}>过账</Button>
          <Button style={marmginLeft}>反审核</Button>
          <Button style={marmginLeft}>反核销</Button>
          <Button style={marmginLeft}>审核生成其他出库数据</Button>
        </Col>
      </Row>
    </span>
  );
}
SearchForm.propTypes = {
  currency: PropTypes.array,
  allVoucherStatus: PropTypes.object,
  exportInputs: PropTypes.object,
  loading: PropTypes.bool,
};
const SearchFormWrapped = Form.create()(SearchForm);
function mapStateToProps({ common, fbaTransferVerification }) {
  const { loading, selectedRowsArr, exportInputs } = fbaTransferVerification;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
