import React from 'react';
import { Table } from 'antd';
import consts from '../../config/const.js';
import { decimalTo2, decimalTo4 } from '../../utils/util.js';

function NestedTable(rowData) {
  const { items } = rowData;
  const columns = [
    { title: 'SKU', dataIndex: 'skuCode', key: 'skuCode' },
    { title: 'SKU名称', dataIndex: 'skuName', key: 'skuName' },
    { title: 'UPC', dataIndex: 'upc', key: 'upc' },
    { title: '计量单位', dataIndex: 'pcsUnit', key: 'pcsUnit', render: consts.unitPcs },
    { title: '订货数量', dataIndex: 'quantity', key: 'quantity' },
    { title: '币别', dataIndex: 'currency', key: 'currency' },
    { title: '汇率', dataIndex: 'exchangeRate', key: 'exchangeRate', render: decimalTo4 },
    { title: '税率', dataIndex: 'taxRate', key: 'taxRate', render: decimalTo2 },
    { title: '单价', dataIndex: 'unitPrice', key: 'unitPrice', render: decimalTo2 },
    { title: '金额', dataIndex: 'money', key: 'money', render: decimalTo2 },
    { title: '税额', dataIndex: 'taxMoney', key: 'taxMoney', render: decimalTo2 },
    { title: '价税合计', dataIndex: 'taxMoneyTotal', key: 'taxMoneyTotal', render: decimalTo2 },
    { title: '金额(本位币)', dataIndex: 'moneyCny', key: 'moneyCny', render: decimalTo2 },
    { title: '税额(本位币)', dataIndex: 'taxMoneyCny', key: 'taxMoneyCny', render: decimalTo2 },
    { title: '价税合计(本位币)', dataIndex: 'taxMoneyTotalCny', key: 'taxMoneyTotalCny', render: decimalTo2 },
  ];
  return (
    <div>
      <Table
        rowKey='id'
        columns={columns}
        scroll={{ x: 1000 }}
        dataSource={items}
        pagination={false}
      />
    </div>
  );
}
export default NestedTable;
