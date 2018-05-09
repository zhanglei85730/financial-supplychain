import React from 'react';
import { Table } from 'antd';
import { decimalTo2, decimalTo4 } from '../../utils/util.js';

function NestedTable(rowData) {
  const { items } = rowData;
  const columns = [
    {
      title: '采购单号',
      dataIndex: '',
      key: '',
      width: 150,
      render: () => {
        if (items &&
          Array.isArray(items) &&
          items.length > 0 &&
          items[0].hasOwnProperty('purchaseOrderId')) {
          return items[0].purchaseOrderId;
        } else {
          return '';
        }
      },
    },
    { title: 'SKU', dataIndex: 'skuCode', key: 'skuCode' },
    { title: 'UPC', dataIndex: 'upc', key: 'upc' },
    { title: 'SKU名称', dataIndex: 'skuName', key: 'skuName' },
    { title: '数量', dataIndex: 'quantity', key: 'quantity' },
    { title: '币别', dataIndex: 'currency', key: 'currency' },
    { title: '汇率', dataIndex: 'exchangeRate', key: 'exchangeRate', render: decimalTo4 },
    { title: '单价', dataIndex: 'unitPrice', key: 'unitPrice', render: decimalTo2 },
    { title: '金额', dataIndex: 'money', key: 'money', render: decimalTo2 },
    { title: '税额', dataIndex: 'taxPriceTotal', key: 'taxPriceTotal', render: decimalTo2 },
    { title: '价税合计', dataIndex: 'taxMoneyTotal', key: 'taxMoneyTotal', render: decimalTo2 },
    { title: '价税合计（本位币）', dataIndex: 'taxMoneyTotalCny', key: 'taxMoneyTotalCny', render: decimalTo2 },
  ];
  return (
    <div>
      <Table
        rowKey='id'
        columns={columns}
        dataSource={items}
        pagination={false}
      />
    </div>
  );
}
export default NestedTable;
