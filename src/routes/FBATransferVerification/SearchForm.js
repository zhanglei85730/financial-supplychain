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
  selectedRowsArr,
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
      id: 'dateFrom',
      formCol,
    },
    {
      id: 'accounts',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '账号',
      formCol,
    },
    {
      id: 'departmentNames',
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
      id: 'amazonSiteGroupIds',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '大区',
      formCol: { ...collapseFormCol },
    }, {
      label: 'shipmentID',
      type: 'text',
      id: 'shipmentIds',
      formCol: { ...collapseFormCol },
    }, {
      label: 'FNSKU',
      type: 'text',
      id: 'upc',
      formCol: { ...collapseFormCol },
    }],
    // 第三行
    [{
      id: 'certificationStatusIds',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '核销状态',
      formCol: { ...collapseFormCol },
      data: [
        { value: '1', text: '待审核' },
        { value: '2', text: '审核拒绝' },
        { value: '3', text: '审核同意' },
        { value: '4', text: '已过账' },
      ],
    }, {
      label: '核销单号',
      type: 'text',
      id: 'certificationOrderIds',
      formCol: { ...collapseFormCol },
    }, {
      id: 'invoiceStatus',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '单据状态',
      formCol: { ...collapseFormCol },
      data: [
        { value: '1', text: '代表以生成' },
        { value: '0', text: '代表未生成' },
      ],
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
  const approveDataHandle = (e) => {
    const target = e.target.id;
    let url = '';
    switch (target) {
      case 'audit':
        url = 'api/fba_warehouse_allot_certification/audit';
        break;
      // 过账接口
      case 'posting':
        url = 'api/fba_warehouse_allot_certification/posting';
        break;
      // 反审核销口
      case 'reverseAudit':
        url = 'api/fba_warehouse_allot_certification/reverse_audit';
        break;
      // 反核销接口
      case 'reverseCertification':
        url = 'api/fba_warehouse_allot_certification/reverse_certification';
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
        paramKey: 'certificationIds',
        url: `${consts.domainInventory}/${url}`,
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
            url={`${consts.domainFbaWarehouseAllotLedger}/api/fba_warehouse_allot_ledger/export`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            buttonType="primary"
          />
          <Button style={marmginLeft} onClick={approveDataHandle} id="audit">审核</Button>
          <Button style={marmginLeft} onClick={approveDataHandle} id="posting">过账</Button>
          <Button style={marmginLeft} onClick={approveDataHandle} id="reverseAudit">反审核</Button>
          <Button style={marmginLeft} onClick={approveDataHandle} id="reverseCertification">反核销</Button>
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
const SearchFormWrapped = Form.create(consts.formCreateOptions)(SearchForm);
function mapStateToProps({ common, fbaTransferVerification }) {
  const { loading, selectedRowsArr, exportInputs } = fbaTransferVerification;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
