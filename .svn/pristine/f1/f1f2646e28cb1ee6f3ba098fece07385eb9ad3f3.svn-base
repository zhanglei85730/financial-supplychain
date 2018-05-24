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
      title: '日期',
      key: 'accountTime',
      dataIndex: 'accountTime',
      width: 160,
    }, {
      title: '类型',
      key: 'orignLegalEntity',
      dataIndex: 'orignLegalEntity',
      width: 150,
    },
    {
      title: '销售平台',
      key: 'legalEntity',
      dataIndex: 'legalEntity',
      width: 150,
    },
    {
      title: '部门',
      key: 'documentNumber',
      dataIndex: 'documentNumber',
      width: 200,
    }, {
      title: '账号',
      key: 'accountName',
      dataIndex: 'accountName',
      width: 200,
    }, {
      title: '站点',
      key: 'area',
      dataIndex: 'area',
      width: 250,
    },
    {
      title: '订单号',
      key: 'ebayOrderId',
      dataIndex: 'ebayOrderId',
      width: 100,
    }, {
      title: '原始SKU',
      key: 'amazonSku',
      dataIndex: 'amazonSku',
      ...tdWidth,
    }, {
      title: '公司SKU',
      key: 'companySku',
      dataIndex: 'companySku',
      ...tdWidth,
    }, {
      title: 'UPC',
      key: 'upc',
      dataIndex: 'upc',
      ...tdWidth,
    }, {
      title: '出库单号',
      key: 'packageInfoName',
      dataIndex: 'packageInfoName',
      ...tdWidth,
    },
    {
      title: '出库仓',
      key: 'storeName',
      dataIndex: 'storeName',
      ...tdWidth,
    },
    {
      title: '结算数量',
      key: 'salesQuantity',
      dataIndex: 'salesQuantity',
      width: 110,
    },
    {
      title: '发货数量',
      key: 'stockQuantity',
      dataIndex: 'stockQuantity',
      width: 130,
    },
    {
      title: '结算核销数量',
      key: 'salesDifference',
      dataIndex: 'salesDifference',
      width: 110,
    },
    {
      title: '发货核销数量',
      key: 'stockDifference',
      dataIndex: 'stockDifference',
      width: 130,
    },
    {
      title: '结余',
      key: 'balance',
      dataIndex: 'balance',
      width: 130,
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
    changePagination(current, size, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  return (
    <div>
      <Alert message={`已选择${selectedRowKeysArr.length}项`} type="info" showIcon style={{ marginTop: '10px' }} />
      <Table
        columns={columns}
        dataSource={list}
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

