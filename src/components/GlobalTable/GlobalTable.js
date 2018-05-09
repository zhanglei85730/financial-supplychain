import React from 'react';
import { connect } from 'dva';
import { Table, Alert } from 'antd';

function GlobalTable({ urlForData }) {
  return (
    <Table
      columns={columns}
      dataSource={list}
      bordered
      // title={() => 'Header'}
      // footer={() => 'Footer'}
      // table必须有key属性，可以将设置id为key
      rowKey="id"
      rowSelection={rowSelection}
      loading={loading}
      style={{ marginTop: '20px' }}
      scroll={{ x: 1500 }}
      pagination={{
        pageSizeOptions: ['10', '20', '30', '40'],
        showSizeChanger: true,
        hideOnSinglePage: true,
      }}
    />
  );
}
// function mapStateToProps({ globalTable }) {
//   return globalTable;
// }
export default GlobalTable;
