import React from 'react';
import { Table, Alert } from 'antd';
import PropTypes from 'prop-types';
import packageConst from './packageConst.js';
import consts from '../../config/const.js';
import { changePagination, decimalTo4, decimalTo2 } from '../../utils/util.js';
import NestedTable from './NestedTable.js';

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
    title: '单据日期',
    key: 'billDate',
    dataIndex: 'billDate',
    width: 160,
  },
  {
    title: '单据编号',
    dataIndex: 'billNo',
    key: 'billNo',
    width: 150,
  },
  {
    title: '法人主体',
    dataIndex: 'legalName',
    key: 'legalName',
    width: 150,
  }, {
    title: '调入部门',
    dataIndex: 'departNameIn',
    key: 'departNameIn',
    width: 140,
    render: consts.fixedDepartment,
  }, {
    title: '调出部门',
    dataIndex: 'departNameOut',
    key: 'departNameOut',
    width: 140,
    render: consts.fixedDepartment,
  }, {
    title: '业务类型',
    dataIndex: 'bizType',
    key: 'bizType',
    ...tdWidth,
  }, {
    title: '调出仓库',
    dataIndex: 'warehouseNameOut',
    key: 'warehouseNameOut',
    width: 110,
  }, {
    title: '调入仓库',
    dataIndex: 'warehouseNameIn',
    key: 'warehouseNameIn',
    ...tdWidth,
  },
  {
    title: '数量',
    dataIndex: 'num',
    key: 'num',
    width: 110,
  }, {
    title: '库存调拨单号',
    dataIndex: 'transferNo',
    key: 'transferNo',
    width: 110,
  },
  {
    title: '单据状态',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: consts.voucherStatusRender,
  }, {
    title: '单据号',
    dataIndex: 'number',
    key: 'number',
    width: 150,
  }, {
    title: '推送金蝶时间',
    dataIndex: 'pushTime',
    key: 'pushTime',
    width: 150,
  }, {
    title: '金蝶生成凭证错误描述',
    dataIndex: 'pushMsg',
    key: 'pushMsg',
    width: 170,
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
        expandedRowRender={NestedTable}
        style={{ marginTop: '20px' }}
        scroll={Object.assign(consts.globalTableScroll, { x: 3000 })}
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
