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
      label: '过账时间',
      type: 'rangePicker',
      id: 'accountDate',
      formCol,
    },
    {
      id: 'departmentNames',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '部门',
      formCol,
      data: currency,
    },
    {
      id: 'legalNames',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '法人',
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
      id: 'warehouseTypes',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '入库类型',
      formCol: { ...collapseFormCol },
      data: currency,
    }, {
      id: 'upcs',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: 'UPC',
      formCol: { ...collapseFormCol },
    }, {
      id: 'skus',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: 'SKU',
      formCol: { ...collapseFormCol },
    }],
    // 第三行
    [{
      label: '仓库名称',
      type: 'text',
      id: 'storeNames',
      formCol: { ...collapseFormCol },
    }, {
      label: '单据状态',
      type: 'select',
      id: 'pproveStatus',
      formCol: { ...collapseFormCol },
      data: voucherStatus,
    }, {
      label: '单据号',
      type: 'text',
      id: 'documentNumbers',
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
            url={`${consts.domainInventory}/inbound_detail/lead_out_csv`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            buttonType="primary"
          />
          <Button style={marginStyle} onClick={approveDataHandle}>审核数据</Button>
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
