import React from 'react';
import { Table } from 'antd';
import { decimalTo2, decimalTo4 } from '../../utils/util.js';

function NestedTable(rowData) {
  // 合计行忽略展开功能
  const { items, billDate, createDate } = rowData;
  const isClapose = billDate === '本页合计' || billDate === '全部合计' || createDate === '本页合计' || createDate === '全部合计';
  const columns = [
    { title: '报关单号', dataIndex: 'declareOrderId', key: 'declareOrderId' },
    { title: '报关日期', dataIndex: 'billDate', key: 'billDate' },
    { title: 'UPC', dataIndex: 'upc', key: 'upc' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: 'SKU名称', dataIndex: 'skuName', key: 'skuName', render: decimalTo4 },
    { title: '单价', dataIndex: 'taxPrice', key: 'taxPrice', render: decimalTo2 },
    { title: '数量', dataIndex: 'qty', key: 'qty' },
    { title: '金额', dataIndex: 'amount', key: 'amount', render: decimalTo2 },
    { title: '税额', dataIndex: 'taxMoney', key: 'taxMoney', render: decimalTo2 },
    { title: '价税合计', dataIndex: 'taxAmount', key: 'taxAmount', render: decimalTo2 },
    { title: '价税合计（本位币）', dataIndex: 'totalTaxAmountCny', key: 'totalTaxAmountCny', render: decimalTo2 },
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
