import React from 'react';
import { Table } from 'antd';
import { decimalTo2, decimalTo4 } from '../../utils/util.js';

function NestedTable(rowData) {
  // 合计行忽略展开功能
  const { items, billDate, createDate } = rowData;
  const isClapose = billDate === '本页合计' || billDate === '全部合计' || createDate === '本页合计' || createDate === '全部合计';
  const columns = [
    { title: '调拨日期', dataIndex: 'billDate', key: 'billDate' },
    { title: '调拨单号', dataIndex: 'transferNo', key: 'transferNo' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'UPC', dataIndex: 'upc', key: 'upc' },
    { title: '数量', dataIndex: 'qty', key: 'qty' },
  ];
  return (
    <div>
      {
        !isClapose ? (<Table
          rowKey='id'
          columns={columns}
          scroll={{ x: 1000 }}
          dataSource={items}
          pagination={false}
        />) : ''
      }

    </div>
  );
}
export default NestedTable;
