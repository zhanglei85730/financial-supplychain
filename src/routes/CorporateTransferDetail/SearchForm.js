import React from 'react';
import { Form, Row, Col, Button, Upload } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PropTypes from 'prop-types';
import FormButtons from './FormButtons.js';
import consts from '../../config/const.js';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';
import GlobalExportForm from '../../components/GlobalExportForm/GlobalExportForm.js';
import packageConst from './packageConst.js';
import { getToken, formParamsFormater, commonUploadFileCallBack, commonUploadStart } from '../../utils/util.js';

function SearchForm({
  dispatch,
  formCollapse,
  form,
  currency,
  allCorporation,
  loading,
  exportInputs,
  selectedRowsArr,
  queryParams,
  approveDataLoading,
  exceptionMsg,
  // 上传按钮加载状态
  uploadStatu,
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
      id: 'outtime',
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
      type: 'datePicker',
      id: 'transferPeriod',
      formCol,
      format: 'YYYY-MM',
      subType: 'monthPicker',
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
      label: '单据状态',
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
      },
      {
        value: '成功',
        text: '成功',
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
      label: '异常信息',
      type: 'select',
      id: 'exceptionMsg',
      formCol: { md: 8 },
      data: exceptionMsg.map((item) => {
        if (item) {
          return { value: item, text: item };
        }
      }),
    }, {
      label: '审核状态',
      type: 'select',
      id: 'auditStatusText',
      formCol: { md: 8 },
      data: [
        {
          value: '0',
          text: '未审核',
        },
        {
          value: '1',
          text: '已审核',
        },
        {
          value: '3',
          text: '审核失败',
        },
      ],
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
  const toolMarginLeft = { marginLeft: '10px' };
  const uploadStyle = { display: 'inline-block' };
  // 审核数据
  const auditHandle = () => {
    dispatch({ type: 'common/approveDataLoadingReduce', payload: true });
    form.validateFields((err, fieldsValue) => {
      dispatch({
        type: 'common/commonApproveDataWithcondition',
        payload: {
          url: `${consts.domainCorporateTransfer}/declare/details/claimData`,
          // 所选行数据
          selectedRowsArr,
          // form 数据
          fieldsValue,
          dispatch,
          // type:'post' //请求的URL method 默认为get 可根据后端要求配置
          // 刷新表格 reduce
          action: { type: `${packageConst.modelNameSapce}/tableData` },
        },
      });
    });
  };
  // 撤销审核数据
  const unAuditHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      dispatch({ type: `${packageConst.modelNameSapce}/revokeAudit`, payload: formParamsFormater(fieldsValue) });
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
            url={`${consts.domainCorporateTransfer}/declare/details/exportExcel`}
            form={form}
            exportInputs={exportInputs}
            dispatch={dispatch}
            reduceName={`${packageConst.modelNameSapce}/exportInputsReduce`}
            buttonType="primary"
            customDateFamat={{ transferPeriod: 'YYYYMM' }}

          />
          <Button style={toolMarginLeft} onClick={auditHandle} loading={approveDataLoading}>审核生成数据</Button>
          <Upload
            style={uploadStyle}
            className="exportBtnInline"
            headers={getToken()}
            name="uploadFile"
            action={`${consts.domainCorporateTransfer}/declare/details/import`}
            onChange={(info) => {
              commonUploadFileCallBack(info, dispatch);
            }}
            beforeUpload={() => {
              commonUploadStart(dispatch);
            }}
          >
            <Button style={toolMarginLeft}>导入</Button>
          </Upload>
          <Button style={toolMarginLeft} onClick={unAuditHandle}>撤销审核</Button>
          <a href={`${consts.domainCorporateTransfer}/reset/common/downImportTemplate?fileName=跨法人调拨明细导入模板.xls`}><Button style={toolMarginLeft}>导出下载模板</Button></a>
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
const SearchFormWrapped = Form.create(consts.formCreateOptions)(SearchForm);
function mapStateToProps({ common, corporateTransferDetail }) {
  const { loading, selectedRowsArr, exportInputs, exceptionMsg } = corporateTransferDetail;
  return { ...common, loading, selectedRowsArr, exportInputs, exceptionMsg };
}
export default connect(mapStateToProps)(SearchFormWrapped);
