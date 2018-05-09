import React from 'react';
import { Table } from 'antd';
import { decimalTo2, decimalTo4 } from '../../utils/util.js';

function NestedTable(rowData) {
  const { items } = rowData;
  const columns = [
    { title: '采购单号', dataIndex: 'purchaseOrderId', key: 'purchaseOrderId' },
    { title: 'SKU', dataIndex: 'skuCode', key: 'skuCode' },
    { title: 'SKU名称', dataIndex: 'skuName', key: 'skuName' },
    { title: '币别', dataIndex: 'currency', key: 'currency' },
    { title: '汇率', dataIndex: 'exchangeRate', key: 'exchangeRate', render: decimalTo4 },
    { title: '退款额', dataIndex: 'amount', key: 'amount', render: decimalTo2 },
    { title: '运费', dataIndex: 'shippingCost', key: 'shippingCost', render: decimalTo2 },
    { title: '亏损值', dataIndex: 'costGrapPrice', key: 'costGrapPrice', render: decimalTo2 },
    { title: '退款合计', dataIndex: 'totalAmount', key: 'totalAmount', render: decimalTo2 },
    { title: '实际退款额', dataIndex: 'actualAmount', key: 'actualAmount', render: decimalTo2 },
    { title: '实际退款额（本位币）', dataIndex: 'actualAmountCny', key: 'actualAmountCny', render: decimalTo2 },
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
