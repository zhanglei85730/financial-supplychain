import React from 'react';
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
      label: '日期',
      type: 'rangePicker',
      id: 'accountDate',
      formCol,
    },
    {
      id: 'departmentNames',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '订单号',
      formCol,
    },
    {
      id: 'legalNames',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '类型',
      formCol,
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
    }, {
      id: 'skus',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '销售平台',
      formCol: { ...collapseFormCol },
    }],
    // 第三行
    [{
      label: '站点',
      type: 'select',
      id: 'area',
      formCol: { ...collapseFormCol },
      data: voucherStatus,
    }, {
      label: '账号',
      type: 'select',
      id: 'pproveStatus',
      formCol: { ...collapseFormCol },
      data: voucherStatus,
    }, {
      label: '部门',
      type: 'select',
      id: 'documentNumbers',
      formCol: { ...collapseFormCol },
      data: voucherStatus,
    }],
    [
      {
        label: '出库仓',
        type: 'select',
        id: 'storeName',
        formCol: { md: 8 },
        data: voucherStatus,
      }, {
        label: '出库单号',
        type: 'text',
        id: 'packageInfoName',
        formCol: { md: 8 },
      }, {
        type: 'custom',
        formCol: { md: 8 },
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
            url={`${consts.domainInventory}/api/getSalesOutLedger/export`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            buttonType="primary"
          />
          <Button style={marginStyle} onClick={approveDataHandle}>核销</Button>
          <Button style={marginStyle} onClick={approveDataHandle}>推送生成单据</Button>
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
function mapStateToProps({ common, differentMachineAccount }) {
  const { loading, selectedRowsArr, exportInputs } = differentMachineAccount;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
