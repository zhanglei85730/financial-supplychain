import React from 'react';
import { Table } from 'antd';
import { decimalTo2, decimalTo4 } from '../../utils/util.js';

function NestedTable(rowData) {
  const { items } = rowData;
  const columns = [
    { title: '采购单号', dataIndex: 'relateOrderId', key: 'relateOrderId' },
    { title: 'SKU', dataIndex: 'skuCode', key: 'skuCode' },
    { title: 'SKU名称', dataIndex: 'skuName', key: 'skuName' },
    { title: '币别', dataIndex: 'currency', key: 'currency' },
    { title: '汇率', dataIndex: 'exchangeRate', key: 'exchangeRate', render: decimalTo4 },
    { title: '货款金额', dataIndex: 'receiMoney', key: 'receiMoney', render: decimalTo2 },
    { title: '折扣', dataIndex: 'discountAmtItem', key: 'discountAmtItem', render: decimalTo2 },
    { title: '运费', dataIndex: 'shippingCost', key: 'shippingCost', render: decimalTo2 },
    { title: '留抵', dataIndex: 'reduceDebt', key: 'reduceDebt', render: decimalTo2 },
    { title: '应付金额', dataIndex: 'payMoney', key: 'payMoney', render: decimalTo2 },
    { title: '实付金额', dataIndex: 'paidMoney', key: 'paidMoney', render: decimalTo2 },
    { title: '实付金额（本位币）', dataIndex: 'paidMoneyCny', key: 'paidMoneyCny', render: decimalTo2 },
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
