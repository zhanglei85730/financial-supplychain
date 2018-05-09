import React from 'react';
import { Table } from 'antd';

function NestedTable(rowData) {
  const { items } = rowData;
  const columns = [
    { title: '采购单号', dataIndex: 'relateOrderId', key: 'relateOrderId', width: 150 },
    { title: '货款金额', dataIndex: 'receiMoney', key: 'receiMoney', width: 150 },
    { title: '运费', dataIndex: 'shippingCost', key: 'shippingCost', width: 150 },
    { title: 'sku', dataIndex: 'skuCode', key: 'skuCode', width: 150 },
    { title: 'skuName', dataIndex: 'skuName', key: 'skuName', width: 150 },
    { title: 'upc', dataIndex: 'upc', key: 'upc', width: 150 },
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
