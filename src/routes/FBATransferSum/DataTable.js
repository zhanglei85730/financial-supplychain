import React from 'react';
import { Table, Alert } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import consts from '../../config/const.js';
import { changePagination, decimalTo4, decimalTo2, taxRateFormater } from '../../utils/util.js';
import packageConst from './packageConst.js';

function DataTable({
  dispatch,
  list,
  loading,
  selectedRowKeysArr,
  total,
  queryParams,
}) {
  const tdWidth = { width: 80 };
  const columns = [
    {
      title: '部门',
      key: 'createDate',
      dataIndex: 'createDate',
      width: 160,
      // fixed: 'left',
    }, {
      title: '账号',
      key: 'purchaseOrderId',
      dataIndex: 'purchaseOrderId',
      width: 150,
      // fixed: 'left',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (row.hasOwnProperty('rowSpan')) {
          obj.props.rowSpan = row.rowSpan;
        }
        return obj;
      },
    },
    {
      title: '大区',
      key: 'corporationName',
      dataIndex: 'corporationName',
      width: 200,
    }, {
      title: '初始时间',
      key: 'supplierName',
      dataIndex: 'supplierName',
      width: 250,
    },
    {
      title: '更新时间',
      key: 'totalQuantity',
      dataIndex: 'totalQuantity',
      width: 100,
    }, {
      title: 'shipmentID',
      key: 'currency',
      dataIndex: 'currency',
      ...tdWidth,
    }, {
      title: 'FNSKU',
      key: 'exchangeRate',
      dataIndex: 'exchangeRate',
      ...tdWidth,
      render: decimalTo4,
    },
    {
      title: '发货数量',
      key: 'taxRate',
      dataIndex: 'taxRate',
      ...tdWidth,
      render: (value, row, index) => (taxRateFormater(value, row, index, false)),
    },
    {
      title: '到货数量',
      key: 'totalMoney',
      dataIndex: 'totalMoney',
      width: 110,
      render: decimalTo2,
    },
    {
      title: '核销数量',
      key: 'taxMoney',
      dataIndex: 'taxMoney',
      width: 130,
      render: decimalTo2,
    }, {
      title: '结余',
      key: 'taxMoneyTotal',
      dataIndex: 'taxMoneyTotal',
      width: 150,
      render: decimalTo2,
    }, {
      title: '调拨状态',
      key: 'totalMoneyCny',
      dataIndex: 'totalMoneyCny',
      width: 110,
      render: decimalTo2,
    }];
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRowKeys`, payload: selectedRowKeys });
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRows`, payload: selectedRows });
  };
  const rowSelection = {
    selectedRowKeys: selectedRowKeysArr,
    onChange: onSelectChange,
    getCheckboxProps: record => ({
      disabled: record.createDate === '本页合计' || record.createDate === '全部合计',
      name: record.name,
    }),
  };
  const changePaginationHandle = (page, pageSize) => {
    changePagination(page, pageSize, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  const pageSizeChangeHandle = (current, size) => {
    // dispatch({ type: `${packageConst.modelNameSapce}/tableData`, payload: { offset: 0, limit: size } });
    changePagination(current, size, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  return (
    <div>
      <Alert message={`已选择${selectedRowKeysArr.length}项`} type="info" showIcon style={{ marginTop: '10px' }} />
      <Table
        columns={columns}
        // dataSource={list}
        dataSource={list}
        // bordered
        // table必须有key属性，可以将设置id为key
        rowKey="id"
        rowSelection={rowSelection}
        loading={loading}
        className="nestedTable"
        style={{ marginTop: '20px' }}
        scroll={Object.assign(consts.globalTableScroll, { x: 3100 })}
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
DataTable.PropTypes = {
  queryParams: PropTypes.object,
};
export default connect()(DataTable);

