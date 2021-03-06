import React from 'react';
import { Form, Row, Col, Button, Modal, Upload } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import FormButtons from './FormButtons.js';
import consts from '../../config/const.js';
import packageConst from './packageConst.js';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';
import { getToken } from '../../utils/util.js';
import AddModal from './AddModal.js';

function SearchForm({
  dispatch,
  formCollapse,
  form,
  allVoucherStatus,
  loading,
  addModalVisible,
  selectedRowsArr,
}) {
  const formCol = formCollapse ? { md: 8, sm: 24 } : { md: 6, sm: 24 };
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
      label: '期间',
      type: 'text',
      id: 'period',
      formCol,
    },
    {
      id: 'sku',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: 'SKU',
      formCol,
    },
    {
      id: 'easDepartName',
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
    [{
      id: 'easCostcenterName',
      // 同select属性,可以附加 select的属性
      type: 'text',
      label: '成本中心',
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
  const marginLeft = { marginLeft: '14px' };
  const toggleAddModal = () => {
    dispatch({ type: `${packageConst.modelNameSapce}/addModalReduce`, payload: true });
  };
  // 确定按钮
  const okHandle = () => {

  };
  const cancelAddModal = () => {
    dispatch({ type: `${packageConst.modelNameSapce}/addModalReduce`, payload: false });
  };
  const deleteHandle = () => {
    dispatch({
      type: 'common/commonDeleteData',
      payload: {
        selectedRowsArr,
        url: `${consts.domainBusinessTypeMaintenance}/businessType/delete`,
        paramsKey: 'idList',
        refreshTableReduce: `${packageConst.modelNameSapce}/tableData`,
      },
    });
  };
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
          <Button type="primary" onClick={toggleAddModal}>新增</Button>
          {/* <Button style={marginLeft}>修改</Button> */}
          <Button style={marginLeft} onClick={deleteHandle}>删除</Button>
          <Upload
            style={uploadStyle}
            className="exportBtnInline"
            headers={getToken()}
            name="uploadFile"
            action={`${consts.domainBusinessTypeMaintenance}/api/uploadSkuRelation`}
          >
            <Button style={marginLeft}>导入</Button>
          </Upload>
        </Col>

      </Row>
      <Modal
        title="新建"
        visible={addModalVisible}
        onCancel={cancelAddModal}
        onOk={okHandle}
        width={500}
        destroyOnClose
        footer={null}
      >
        <AddModal />
      </Modal>
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
function mapStateToProps({ common, skuDepartmentMaintenance }) {
  const { loading, selectedRowsArr, exportInputs, addModalVisible, cancelAddModal } = skuDepartmentMaintenance;
  return { ...common, loading, selectedRowsArr, exportInputs, addModalVisible, cancelAddModal };
}
export default connect(mapStateToProps)(SearchFormWrapped);
