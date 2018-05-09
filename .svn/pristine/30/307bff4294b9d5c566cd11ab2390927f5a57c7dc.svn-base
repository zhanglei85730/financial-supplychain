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
      title: '核销时间',
      key: 'createDate',
      dataIndex: 'createDate',
      width: 160,
      // fixed: 'left',
    }, {
      title: '核销单号',
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
      title: '部门',
      key: 'corporationName',
      dataIndex: 'corporationName',
      width: 200,
    }, {
      title: '调拨单号',
      key: 'supplierName',
      dataIndex: 'supplierName',
      width: 250,
    },
    {
      title: '账号',
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
      title: 'SKU',
      key: 'taxRate',
      dataIndex: 'taxRate',
      ...tdWidth,
      render: (value, row, index) => (taxRateFormater(value, row, index, false)),
    },
    {
      title: '核销数量',
      key: 'totalMoney',
      dataIndex: 'totalMoney',
      width: 110,
      render: decimalTo2,
    },
    {
      title: '核销金额',
      key: 'taxMoney',
      dataIndex: 'taxMoney',
      width: 130,
      render: decimalTo2,
    }, {
      title: '核销状态',
      key: 'taxMoneyTotal',
      dataIndex: 'taxMoneyTotal',
      width: 150,
      render: decimalTo2,
    }, {
      title: '申请人',
      key: 'totalMoneyCny',
      dataIndex: 'totalMoneyCny',
      width: 110,
      render: decimalTo2,
    }, {
      title: '审核人',
      key: 'TotalTaxMoneyCny',
      dataIndex: 'totalTaxMoneyCny',
      width: 130,
      render: decimalTo2,
    }, {
      title: '过账人',
      key: 'totalTaxMoneyTotalCny',
      dataIndex: 'totalTaxMoneyTotalCny',
      width: 150,
      render: decimalTo2,
    }, {
      title: '单据状态',
      key: 'deliveryDate',
      dataIndex: 'deliveryDate',
      width: 100,
      render: consts.dateFormat,
    }, {
      title: '推送金蝶时间',
      key: 'buyerName',
      dataIndex: 'buyerName',
      ...tdWidth,
    }, {
      title: '金蝶生成凭证错误描述',
      key: 'orgName',
      dataIndex: 'orgName',
      width: 150,
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

