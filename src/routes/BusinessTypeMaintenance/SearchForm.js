import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import FormButtons from './FormButtons.js';
import consts from '../../config/const.js';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';
import GlobalExportForm from '../../components/GlobalExportForm/GlobalExportForm.js';
import { jsonToSelectOptions } from '../../utils/util.js';

function SearchForm({
  dispatch,
  formCollapse,
  form,
  currency,
  allCorporation,
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
      label: '佰易/E登业务类型编码',
      type: 'text',
      id: 'queryDate',
      formCol,
    },
    {
      id: 'account',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '金蝶业务类型',
      formCol,
    },
    {
      id: 'legalPersonId',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '金蝶业务类型编码',
      formCol,
    }],
  ];
  const voucherStatus = [];
  const voucherStatusObj = allVoucherStatus;

  // 单据状态返回的是json
  for (const key in voucherStatusObj) {
    voucherStatus.push({ value: key, text: voucherStatusObj[key] });
  }
  const collapseFormItemsConfig = [
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
  const marginLeft = { marginLeft: '14px' };
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
          <Button type="primary">新增</Button>
          <Button style={marginLeft}>修改</Button>
          <Button style={marginLeft}>删除</Button>
          <GlobalExportForm
            url={`${consts.domain}/api/getPurchaseOrderList/export`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName="chaseOrders/exportInputsReduce"
            style={marginLeft}
          />
        </Col>
      </Row>
    </span>
  );
}
SearchForm.propTypes = {
  currency: PropTypes.array,
  allCorporation: PropTypes.array,
  allVoucherStatus: PropTypes.object,
  exportInputs: PropTypes.object,
  loading: PropTypes.bool,
};
const SearchFormWrapped = Form.create()(SearchForm);
function mapStateToProps({ common, businessTypeMaintenance }) {
  const { loading, selectedRowsArr, exportInputs } = businessTypeMaintenance;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
