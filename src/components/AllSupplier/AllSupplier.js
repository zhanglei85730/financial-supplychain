import React from 'react';
import { Modal, Table, Input } from 'antd';
import PropTypes from 'prop-types';
import styles from './AllSupplier.css';
// import { changePagination } from '../../utils/util.js';

const { Search } = Input;

function AllSupplier({
  isVisibile,
  dispatch,
  form,
  // supplierSearchList,
  supplierTableLoading,
  supplierSelect,
  supplierList,
}) {
  const { supplierName, supplierId } = supplierSelect;
  // const { supplierList } = context;
  const columns = [{
    title: '供应商',
    dataIndex: 'supplierName',
    key: 'supplierName',
  }];
  const handleOk = () => {
    form.setFieldsValue({
      supplierName,
      supplierId,
    });
    dispatch({ type: 'common/supplierModalVisibileReduce', payload: false });
  };

  const handleCancel = () => {
    dispatch({ type: 'common/supplierModalVisibileReduce', payload: false });
  };
  const rowSelection = {
    type: 'radio',
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch({ type: 'common/supplierSelect', payload: selectedRows[0] });
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  // 搜索事件
  const serachHandle = (value) => {
    if (value) {
      dispatch({ type: 'common/getAllSupplier', payload: { supplierName: value } });
    }
  };
  const searchStyle = { marginBottom: '20px' };
  const changePaginationHandle = (page, pageSize) => {
    const pagationParam = { offset: (page - 1) * pageSize, limit: 10, key: Math.random() };
    dispatch({ type: 'common/getAllSupplier', payload: pagationParam });
    // changePagination(page, pageSize, dispatch, 'common/', context.queryParams);
  };
  return (
    <div className={styles.normal}>
      <Modal
        title="选择供应商"
        visible={isVisibile}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        maskClosable={false}
      >
        <Search
          placeholder="input search text"
          enterButton="搜索" size="default"
          style={searchStyle}
          onSearch={serachHandle}
        />
        <Table
          loading={supplierTableLoading}
          dataSource={supplierList.rows}
          columns={columns}
          rowSelection={rowSelection}
          rowKey="id"
          bordered
          pagination={{
            total: supplierList.total,
            pageSize: 10,
            hideOnSinglePage: false,
            onChange: changePaginationHandle,
            showTotal: (total) => (`共 ${total} 条`),
          }}
        />
      </Modal>
    </div>
  );
}
AllSupplier.PropTypes = {
  supplierSearchList: PropTypes.array,
  supplierTableLoading: PropTypes.bool,
  supplierSelect: PropTypes.object,
  supplierList: PropTypes.object,
};
export default AllSupplier;
