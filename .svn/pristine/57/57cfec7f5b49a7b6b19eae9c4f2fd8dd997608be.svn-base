import React from 'react';
import { Table } from 'antd';
import { decimalTo2 } from '../../utils/util.js';

function NestedTable(rowData) {
  const { items } = rowData;
  const columns = [
    { title: '采购单号', dataIndex: 'relateOrderId', key: 'relateOrderId' },
    { title: '货款金额', dataIndex: 'receiMoney', key: 'receiMoney', render: decimalTo2 },
    { title: '留抵', dataIndex: 'reduceDebt', key: 'reduceDebt', render: decimalTo2 },
    { title: 'sku', dataIndex: 'skuCode', key: 'skuCode' },
    { title: 'skuName', dataIndex: 'skuName', key: 'skuName' },
    { title: 'upc', dataIndex: 'upc', key: 'upc' },
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
