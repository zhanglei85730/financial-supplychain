import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import FormButtons from './FormButtons.js';
import consts from '../../config/const.js';
import PushEas from '../../components/PushEas/PushEas.js';
import PushEasModal from '../../components/PushEasModal/PushEasModal.js';
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
  pushEasResponse,
  globalPagationParam,
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
      label: '单据时间',
      type: 'rangePicker',
      id: 'queryDate',
      formCol,
    },
    {
      id: 'account',
      type: 'select',
      label: '法人主体',
      data: currency,
      formCol,
    },
    {
      id: 'legalPersonId',
      type: 'select',
      label: '仓库名称',
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
      id: 'site',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '部门',
      formCol: { ...collapseFormCol },
      data: currency,
    }, {
      id: 'site',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '业务类型',
      formCol: { ...collapseFormCol },
      data: currency,
    }, {
      id: 'site',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '单据编号',
      formCol: { ...collapseFormCol },
      data: currency,
    }],
    // 第四行
    [{
      label: 'UPC',
      type: 'text',
      id: 'voucherNumber',
      formCol: { ...collapseFormCol },
    },
    {
      label: '成本中心',
      type: 'text',
      id: 'voucherNumber',
      formCol: { ...collapseFormCol },
    },
    {
      label: 'SKU',
      type: 'text',
      id: 'voucherNumber',
      formCol: { md: 8 },
    }],
    [{
      label: '单据号',
      type: 'text',
      id: 'voucherNumber',
      formCol: { md: 8 },
    }, {
      label: '单据状态',
      type: 'select',
      id: 'voucherStatus',
      formCol: { md: 8 },
      data: jsonToSelectOptions(allVoucherStatus),
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
          <PushEas
            buttonText="推送金蝶EAS"
            dispatch={dispatch}
            modalShowReduce="common/pushEasModalRedece"
            pushReduce="common/pushEas"
            form={form}
            pushEasName={`${packageConst.pushEasName}`}
            modelNameSapce="common"
            selectedRowsArr={selectedRowsArr}
            pushEasResponse={pushEasResponse}
            style={marmginRight}
          />
          <Button>撤销审核</Button>
          <PushEasModal
            dispatch={dispatch}
            refreshTableRedece={`${packageConst.modelNameSapce}/tableData`}
            globalPagationParam={globalPagationParam}
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
function mapStateToProps({ common, otherInventoryOutbound }) {
  const { loading, selectedRowsArr, exportInputs } = otherInventoryOutbound;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
