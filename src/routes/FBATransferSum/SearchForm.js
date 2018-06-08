import React from 'react';
import { Form, Row, Col, Button, message } from 'antd';
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
  allVoucherStatus,
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
      type: 'datePicker',
      format: 'YYYY-MM',
      subType: 'rangePicker',
      mode: 'month',
      id: 'dates',
      formCol,
    },
    {
      id: 'amazonAccountName',
      type: 'text',
      label: '账号',
      formCol,
    },
    {
      id: 'departmentName',
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
      id: 'site',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '大区',
      formCol: { ...collapseFormCol },
      data: [
        {
          value: '11',
          text: '北美地区',
        },
        {
          value: '12',
          text: '欧洲',
        },
        {
          value: '13',
          text: '远东地区',
        },
        {
          value: '14',
          text: '加拿大',
        },
        {
          value: '15',
          text: '澳洲',
        },
      ],
    }, {
      label: 'shipmentID',
      type: 'text',
      id: 'shipmentId',
      formCol: { ...collapseFormCol },
    }, {
      label: 'FNSKU',
      type: 'text',
      id: 'fnsku',
      formCol: { ...collapseFormCol },
    }],
    // 第四行
    [{
      id: 'account',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '调拨状态',
      data: [
        {
          value: '已发货',
          text: '已发货',
        },
        {
          value: '部分到货',
          text: '部分到货',
        },
        {
          value: '待核销完成',
          text: '待核销完成',
        },
        {
          value: '已完结 ',
          text: '已完结 ',
        },
      ],
      formCol: { ...collapseFormCol },
    },
    {
      label: '单据号',
      type: 'text',
      id: 'voucherNumber',
      formCol: { ...collapseFormCol },
    }, {
      label: '单据状态',
      type: 'select',
      id: 'voucherStatus',
      formCol: { ...collapseFormCol },
      data: jsonToSelectOptions(allVoucherStatus),
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
  const approveDataHandle = () => {
    const isSelected = Array.isArray(selectedRowsArr) && selectedRowsArr.length > 0;
    const resultArr = [];
    if (!isSelected) {
      message.error('请选择数据然后再操作');
      return false;
    }
    selectedRowsArr.forEach((item) => {
      if (item.hasOwnProperty('shipmentId') && item.hasOwnProperty('fnsku')) {
        resultArr.push({
          shipmentId: item.shipmentId,
          fnsku: item.fnsku,
        });
      }
    });
    dispatch({ type: `${packageConst.modelNameSapce}/submitCertification`, payload: resultArr });
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
            url={`${consts.domainFbaWarehouseAllotLedger}/api/fba_warehouse_allot_ledger_sts/export`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            buttonType="primary"
            style={marmginRight}
          />
          <Button onClick={approveDataHandle}>核销</Button>
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
const SearchFormWrapped = Form.create(consts.formCreateOptions)(SearchForm);
function mapStateToProps({ common, fbaTransferSum }) {
  const { loading, selectedRowsArr, exportInputs } = fbaTransferSum;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
