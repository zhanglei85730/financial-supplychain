import React from 'react';
import { Table } from 'antd';
import consts from '../../config/const.js';
import { decimalTo2, decimalTo4 } from '../../utils/util.js';

function NestedTable(rowData) {
  const { items } = rowData;
  const columns = [
    { title: '包裹号', dataIndex: 'packageNumber', key: 'packageNumber' },
    { title: '订单号', dataIndex: 'orderNumber', key: 'orderNumber' },
    { title: '仓库', dataIndex: 'warehouseName', key: 'warehouseName' },
    { title: '税率', dataIndex: 'taxRate', key: 'taxRate', render: decimalTo4 },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: decimalTo2 },
    { title: '税额', dataIndex: 'taxAmount', key: 'taxAmount', render: decimalTo2 },
    { title: '价税合计', dataIndex: 'adValorem', key: 'adValorem' },
    { title: '价税合计（本位币）', dataIndex: 'adValoremCny', key: 'adValoremCny', render: decimalTo2 },
    { title: '数量', dataIndex: 'quantity', key: 'quantity' },
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
