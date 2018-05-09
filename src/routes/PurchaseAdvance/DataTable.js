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
    // fixed: 'left',
  },
  {
    title: '请款单号',
    dataIndex: 'requestOrderId',
    key: 'requestOrderId',
    width: 150,
  },
  // {
  //   title: '单据类型',
  //   dataIndex: 'type',
  //   key: 'type',
  //   width: 100,
  //   render: (value, row, index) => {
  //     return consts.renderValue('采购预付', row, index);
  //   },
  // },
  {
    title: '法人主体',
    dataIndex: 'corporationName',
    key: 'corporationName',
    width: 150,
  }, {
    title: '供应商',
    dataIndex: 'supplierName',
    key: 'supplierName',
    width: 200,
  }, {
    title: '币别',
    dataIndex: 'currency',
    key: 'currency',
    ...tdWidth,
  }, {
    title: '汇率',
    dataIndex: 'exchangeRate',
    key: 'exchangeRate',
    ...tdWidth,
    render: decimalTo4,
    align: consts.right,
  }, {
    title: '货款金额',
    dataIndex: 'receiMoneys',
    key: 'receiMoneys',
    width: 110,
    render: decimalTo2,
    align: consts.right,
  }, {
    title: '折扣',
    dataIndex: 'discountAmt',
    key: 'discountAmt',
    ...tdWidth,
    render: decimalTo2,
    align: consts.right,
  },
  //  {
  //   title: '运费',
  //   dataIndex: 'shippingCost',
  //   key: 'shippingCost',
  //   ...tdWidth,
  //   render: decimalTo2,
  // },
  // {
  //   title: '留抵',
  //   dataIndex: 'reduceDebt',
  //   key: 'reduceDebt',
  //   ...tdWidth,
  //   render: decimalTo2,
  // },
  {
    title: '应付金额',
    dataIndex: 'couldPay',
    key: 'couldPay',
    width: 110,
    render: decimalTo2,
    align: consts.right,
  }, {
    title: '实付金额',
    dataIndex: 'payMoneys',
    key: 'payMoneys',
    width: 110,
    render: decimalTo2,
    align: consts.right,
  },
  {
    title: '实付金额(本位币)',
    dataIndex: 'paidMoneyCny',
    key: 'paidMoneyCny',
    width: 140,
    render: decimalTo2,
    align: consts.right,
  },
  // {
  //   title: '付款类型',
  //   dataIndex: '',
  //   key: '',
  //   ...tdWidth,
  // },
  {
    title: '付款方式',
    dataIndex: 'payType',
    key: 'payType',
    ...tdWidth,
    render: consts.globalPayType,
    align: consts.right,
  },
  {
    title: '付款账户',
    dataIndex: 'payAccount',
    key: 'payAccount',
    width: 200,
    align: consts.right,
  }, {
    title: '结算方式',
    dataIndex: 'methodName',
    key: 'methodName',
    width: 120,
    align: consts.right,
  }, {
    title: '请款人',
    dataIndex: 'requesterName',
    key: 'requesterName',
    ...tdWidth,
    align: consts.right,
  }, {
    title: '事业部',
    dataIndex: 'orgName',
    key: 'orgName',
    width: 140,
  }, {
    title: '单据状态',
    dataIndex: 'voucherStatus',
    key: 'voucherStatus',
    width: 120,
    render: consts.voucherStatusRender,
  }, {
    title: '单据号',
    dataIndex: 'voucherNumber',
    key: 'voucherNumber',
    width: 150,
  }, {
    title: '推送金蝶时间',
    dataIndex: 'pushEasDate',
    key: 'pushEasDate',
    width: 150,
  }, {
    title: '金蝶生成凭证错误描述',
    dataIndex: 'voucherErrorMessage',
    key: 'voucherErrorMessage',
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
