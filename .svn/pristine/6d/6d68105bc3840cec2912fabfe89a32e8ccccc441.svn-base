import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Table, Alert } from 'antd';
import consts from '../../config/const.js';
import packageConst from './packageConst.js';
import { changePagination, decimalTo2, decimalTo4, taxRateFormater } from '../../utils/util.js';

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
    key: 'createDate',
    dataIndex: 'createDate',
    width: 150,
    fixed: 'left',
  }, {
    title: '入库单号',
    key: 'storageNumber',
    dataIndex: 'storageNumber',
    width: 180,
    fixed: 'left',
  }, {
    title: '订单编号',
    dataIndex: 'purchaseNumber',
    key: 'purchaseNumber',
    width: 150,
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    ...tdWidth,
    render: (value) => {
      let type = '';
      switch (value) {
        case '0':
          type = '不良入库';
          break;
        case '1':
          type = '良品入库';
          break;
        case '3':
          type = 'E登入库';
          break;
        default:
          type = '';
      }
      return type;
    },
  }, {
    title: '法人主体',
    dataIndex: 'corporationName',
    key: 'corporationName',
    width: 160,
  }, {
    title: '供应商',
    dataIndex: 'supplierName',
    key: 'supplierName',
    width: 250,
  },
  //  {
  //   title: '库存组织',
  //   dataIndex: 'inventoryOrgName',
  //   key: 'inventoryOrgName',
  //   width: 130,
  // },
  {
    title: '仓库',
    dataIndex: 'warehouseName',
    key: 'warehouseName',
    width: 130,
  }, {
    title: 'UPC',
    dataIndex: 'upc',
    key: 'upc',
    width: 200,
  }, {
    title: 'SKU',
    dataIndex: 'skuCode',
    key: 'skuCode',
    width: 150,
  }, {
    title: 'SKU 名称',
    dataIndex: 'skuName',
    key: 'skuName',
    width: 400,
  }, {
    title: '计量单位',
    dataIndex: 'unit',
    key: 'unit',
    ...tdWidth,
    render: consts.unitPcs,
  }, {
    title: '订货数量',
    dataIndex: 'nondefectiveNumber',
    key: 'nondefectiveNumber',
    ...tdWidth,
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
  }, {
    title: '税率',
    dataIndex: 'taxRate',
    key: 'taxRate',
    ...tdWidth,
    render: (value, row, index) => (taxRateFormater(value, row, index, false)),
  },
  // {
  //   title: '含税',
  //   dataIndex: 'isTax',
  //   key: 'isTax',
  //   ...tdWidth,
  //   render: consts.isTax,
  // },
  {
    title: '单价',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    width: 100,
    render: decimalTo2,
  }, {
    title: '金额',
    dataIndex: 'money',
    key: 'money',
    width: 113,
    render: decimalTo2,
  },
  // {
  //   title: '含税单价',
  //   dataIndex: 'taxUnitPrice',
  //   key: 'taxUnitPrice',
  //   width: 110,
  //   render: decimalTo2,
  // },
  {
    title: '税额',
    dataIndex: 'taxtPriceTotal',
    key: 'taxtPriceTotal',
    width: 113,
    render: decimalTo2,
  }, {
    title: '价税合计',
    dataIndex: 'taxMoneyTotal',
    key: 'taxMoneyTotal',
    width: 113,
    render: decimalTo2,
  },
  {
    title: '价税合计(本位币)',
    dataIndex: 'taxMoneyTotalCny',
    key: 'taxMoneyTotalCny',
    width: 140,
    render: decimalTo2,
  }, {
    title: '结算方式',
    dataIndex: 'methodName',
    key: 'methodName',
    width: 200,
  }, {
    title: '交货日期',
    dataIndex: 'deliveryDate',
    key: 'deliveryDate',
    width: 150,
  }, {
    title: '采购员',
    dataIndex: 'buyerName',
    key: 'buyerName',
    ...tdWidth,
  }, {
    title: '事业部',
    dataIndex: 'orgName',
    key: 'orgName',
    width: 150,
  }, {
    title: '单据状态',
    dataIndex: 'voucherStatus',
    key: 'voucherStatus',
    width: 100,
    render: consts.voucherStatusRender,
  }, {
    title: '单据号',
    dataIndex: 'voucherNumber',
    key: 'voucherNumber',
    width: 120,
  }, {
    title: '推送金蝶时间',
    dataIndex: 'pushEasDate',
    key: 'pushEasDate',
    width: 180,
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
        dataSource={list}
        bordered
        // table必须有key属性，可以将设置id为key
        rowKey="id"
        rowSelection={rowSelection}
        loading={loading}
        style={{ marginTop: '20px' }}
        scroll={Object.assign(consts.globalTableScroll, { x: 4062 })}
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
