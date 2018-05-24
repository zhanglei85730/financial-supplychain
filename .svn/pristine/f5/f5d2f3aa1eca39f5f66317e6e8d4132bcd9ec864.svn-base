import React from 'react';
import { Form, Row, Col, Button, Upload } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import FormButtons from './FormButtons.js';
import consts from '../../config/const.js';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';
import GlobalExportForm from '../../components/GlobalExportForm/GlobalExportForm.js';
import packageConst from './packageConst.js';
import { jsonToSelectOptions, getToken } from '../../utils/util.js';

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
      label: '出库日期',
      type: 'rangePicker',
      id: 'warehouseStartTime',
      formCol,
    },
    {
      id: 'transferNo',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '调拨单号',
      formCol,
    },
    {
      id: 'declareOrderId',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '报关单号',
      formCol,
    }],
  ];
  const collapseFormItemsConfig = [
    // 第二行
    [{
      id: 'legalNameOut',
      // 同select属性,可以附加 select的属性
      type: 'select',
      label: '法人主体',
      formCol: { ...collapseFormCol },
      data: allCorporation.map((item, index) => {
        return { value: item.corporationId, key: index, text: item.corporationName };
      }),
    }, {
      label: '报关日期',
      type: 'rangePicker',
      id: 'transferDate',
      formCol,
    }, {
      label: '交易期间',
      type: 'rangePicker',
      id: 'transferPeriod',
      formCol,
    }],
    [{
      label: 'SKU',
      type: 'text',
      id: 'sku',
      formCol: { ...collapseFormCol },
    },
    {
      label: '币种',
      type: 'select',
      id: 'currency',
      formCol: { ...collapseFormCol },
      data: currency,
    }, {
      label: 'FNSKU',
      type: 'text',
      id: 'fnsku',
      formCol: { ...collapseFormCol },
    }],
    [{
      label: 'shipmentID',
      type: 'text',
      id: 'shipmentId',
      formCol: { ...collapseFormCol },
    },
    {
      label: '状态',
      type: 'select',
      id: 'status',
      formCol: { ...collapseFormCol },
      data: [{
        value: '待匹配',
        text: '待匹配',
      },
      {
        value: '错误',
        text: '错误',
      }],
    },
    {
      label: '错误类型',
      type: 'select',
      id: 'errorMsg',
      formCol: { ...collapseFormCol },
      data: [{
        value: '币别不匹配',
        text: '币别不匹配',
      },
      {
        value: '法人主体不匹配',
        text: ' 法人主体不匹配',
      }],
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
  const toolMarginLeft = { marginLeft: '10px' };
  const uploadStyle = { display: 'inline-block' };
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
            url={`${consts.domainCorporateTransfer}/declare/details/exportExcel`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            buttonType="primary"
          />
          <Upload
            style={uploadStyle}
            className="exportBtnInline"
            headers={getToken()}
            // data={{ 'name': 'uploadFile' }}
            action={`${consts.domainCorporateTransfer}/declare/details/import`
            }
          >
            <Button style={toolMarginLeft}>导入</Button>
          </Upload>
          <Button style={toolMarginLeft}>审核生成数据</Button>
        </Col>
      </Row>
    </span >
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
function mapStateToProps({ common, corporateTransferDetail }) {
  const { loading, selectedRowsArr, exportInputs } = corporateTransferDetail;
  return { ...common, loading, selectedRowsArr, exportInputs };
}
export default connect(mapStateToProps)(SearchFormWrapped);
