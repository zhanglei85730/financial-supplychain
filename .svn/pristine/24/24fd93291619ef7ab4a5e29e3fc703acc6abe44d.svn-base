import React from 'react';
import { Table, Alert } from 'antd';
import PropTypes from 'prop-types';
import packageConst from './packageConst.js';
import consts from '../../config/const.js';
import { changePagination, decimalTo4, decimalTo2 } from '../../utils/util.js';

function DataTable({
  dispatch,
  list,
  loading,
  selectedRowKeysArr,
  total,
  queryParams,
  }) {
  const tdWidth = { width: 80 };
  const columns = [{
    title: '佰易/E登业务类型',
    key: 'billDate',
    dataIndex: 'billDate',
    width: 160,
    // fixed: 'left',
  },
  {
    title: '金蝶业务类型',
    dataIndex: 'requestOrderId',
    key: 'requestOrderId',
    width: 150,
  },
  {
    title: '金蝶业务类型编码',
    dataIndex: 'corporationName',
    key: 'corporationName',
    width: 150,
  }, {
    title: '创建人',
    dataIndex: 'supplierName',
    key: 'supplierName',
    width: 200,
  }, {
    title: '创建时间',
    dataIndex: 'currency',
    key: 'currency',
    ...tdWidth,
  }, {
    title: '更新人',
    dataIndex: 'exchangeRate',
    key: 'exchangeRate',
    ...tdWidth,
    render: decimalTo4,
    align: consts.right,
  }, {
    title: '更新日期',
    dataIndex: 'receiMoneys',
    key: 'receiMoneys',
    width: 110,
    render: decimalTo2,
    align: consts.right,
  }];

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRowKeys`, payload: selectedRowKeys });
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRows`, payload: selectedRows });
  };
  const rowSelection = {
    selectedRowKeys: selectedRowKeysArr,
    onChange: onSelectChange,
    getCheckboxProps: record => ({
      disabled: record.billDate === '本页合计' || record.billDate === '全部合计',
      name: record.name,
    }),
  };
  const changePaginationHandle = (page, pageSize) => {
    changePagination(page, pageSize, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  const pageSizeChangeHandle = (current, size) => {
    // dispatch({ type: `${packageConst.modelNameSapce}/tableData`, payload: { offset: 0, limit: size } });
    changePagination(current, size, dispatch, `${packageConst.modelNameSapce}`);
  };
  return (
    <div>
      <Alert message={`已选择${selectedRowKeysArr.length}项`} type="info" showIcon style={{ marginTop: '10px' }} />
      <Table
        columns={columns}
        dataSource={list}
        className="nestedTable"
        // bordered
        // table必须有key属性，可以将设置id为key
        rowKey="id"
        rowSelection={rowSelection}
        loading={loading}
        style={{ marginTop: '20px' }}
        scroll={Object.assign(consts.globalTableScroll)}
        pagination={{
          total,
          defaultPageSize: consts.defaultPageSize,
          pageSizeOptions: consts.pageSizeOptions,
          showSizeChanger: true,
          hideOnSinglePage: false,
          onChange: changePaginationHandle,
          onShowSizeChange: pageSizeChangeHandle,
          showTotal: () => (consts.GlobalShowTotal(total)),
        }}

      />
    </div>
  );
}
DataTable.propTypes = {
  queryParams: PropTypes.object,
};

export default DataTable;
