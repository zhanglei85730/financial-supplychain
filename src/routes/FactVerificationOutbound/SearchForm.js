﻿import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import FormButtons from './FormButtons.js';
import consts from '../../config/const.js';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';
import PushEasModal from '../../components/PushEasModal/PushEasModal.js';
import GlobalExportForm from '../../components/GlobalExportForm/GlobalExportForm.js';
import PushEas from '../../components/PushEas/PushEas.js';
import packageConst from './packageConst.js';

function SearchForm({
  dispatch,
  formCollapse,
  form,
  currency,
  allCorporation,
  allVoucherStatus,
  loading,
  globalPagationParam,
  selectedRowsArr,
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
      label: '过账时间',
      type: 'rangePicker',
      id: 'postDate',
      formCol,
    },
    {
      id: 'accountName',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '账号',
      formCol,
    },
    {
      id: 'departName',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '部门',
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
    // 第二行
    [{
      id: 'area',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '站点',
      formCol: { ...collapseFormCol },
    }, {
      id: 'amazonSku',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '原始SKU',
      formCol: { ...collapseFormCol },
    }, {
      id: 'companySku',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '公司SKU',
      formCol: { ...collapseFormCol },
    }],
    // 第三行
    [{
      label: '核销单号',
      type: 'text',
      id: 'verificatioId',
      formCol: { ...collapseFormCol },
    }, {
      label: '订单号',
      type: 'text',
      id: 'ebayOrderId',
      formCol: { ...collapseFormCol },
    }, {
      label: '核销状态',
      type: 'text',
      id: 'verifStatus',
      formCol: { ...collapseFormCol },
    }],
    [{
      label: '单据状态',
      type: 'text',
      id: 'documentStatus',
      formCol: { md: 8 },
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
  const approveDataHandle = () => {
    dispatch({
      type: 'common/commonApproveData',
      payload: {
        selectedRowsArr,
        paramKey: 'ids',
        url: `${consts.domainInventory}/inout_bound_detail/approve_data`,
      },
    });
  };
  const marginStyle = { marginLeft: "10px" };
  // 操作
  const addCalAgainProcess = (e) => {
    const target = e.target.id;
    let url = '';
    switch (target) {
      // 审核数据
      case 'factVerificationVerify':
        url = 'xx';
        break;
      // 过账
      case 'factVerificationAccount':
        url = 'xx';
        break;
      // 反审核
      case 'factUnVerification':
        url = '/api/verifyStockSheet';
        break;
      // 反核销
      case 'factVerification':
        url = 'xx';
        break;
      // 审核生成其他出库数据
      case 'factVerificationOutbound':
        url = 'xxx';
        break;
      // 反审核
      default:
        url = false;
    }
    form.validateFields((err, fieldsValue) => {
      dispatch({
        type: 'common/commonApproveDataWithcondition',
        payload: {
          url: `${consts.domainFabStorehouseMaintenance}${url}`,
          selectedRowsArr,
          fieldsValue,
          dispatch,
          action: { type: `${packageConst.modelNameSapce}/tableData` },
          type: 'post',
        },
      });
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
            url={`${consts.domainFabStorehouseMaintenance}/api/getStockSheet/export`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            buttonType="primary"
          />
          <Button style={marginStyle} id="factVerificationVerify" onClick={addCalAgainProcess}>审核数据</Button>
          <Button style={marginStyle} id="factVerificationAccount" onClick={addCalAgainProcess}>过账</Button>
          <Button style={marginStyle} id="factUnVerification" onClick={addCalAgainProcess}>反审核</Button>
          <Button style={marginStyle} onClick={addCalAgainProcess} id="factVerification">反核销</Button>
          <Button style={marginStyle} id="factVerificationOutbound" onClick={addCalAgainProcess}>审核生成其他出库数据</Button>
        </Col>
      </Row>
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
function mapStateToProps({ common, factVerificationOutbound }) {
  const { loading, selectedRowsArr, exportInputs } = factVerificationOutbound;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
