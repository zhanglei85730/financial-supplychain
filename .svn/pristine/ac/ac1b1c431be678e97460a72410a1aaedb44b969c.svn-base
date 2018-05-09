import React from 'react';
import { connect } from 'dva';
import { Table, Alert } from 'antd';
import PropTypes from 'prop-types';
function Table01({ dispatch, list: dataSource, loading, selectedRowKeysArr }) {
  const columns = [
    {
      title: '文件名',
      key: 'fileName',
      dataIndex: 'fileName',
      width: '150px',
    }, {
      title: '部门',
      key: 'departName',
      dataIndex: 'departName',
      render: (text, record, index) => <a href="#">{text}</a>,
      width: '150px',
    }, {
      title: '账号 ',
      className: 'accountCode',
      dataIndex: 'accountCode',
      key: 'accountCode',
      sorter: true,
      width: '150px',
    }, {
      title: '当前状态',
      key: 'reportStatus',
      dataIndex: 'reportStatus',
      width: '150px',
    }, {
      title: '账单日期',
      key: 'reportDate',
      dataIndex: 'reportDate',
      width: '150px',
    }, {
      title: '生成时间',
      key: 'createdTimeStamp',
      dataIndex: 'createdTimeStamp',
      width: '150px',
    }, {
      title: '审核状态',
      key: 'verifyStatus',
      dataIndex: 'verifyStatus',
      width: '150px',
    }, {
      title: '审核人',
      key: 'userName',
      dataIndex: 'userName',
      width: '150px',
    }, {
      title: '审核时间',
      key: 'verifyDate',
      dataIndex: 'verifyDate',
      width: '150px',
    }, {
      title: '操作',
      key: '',
      dataIndex: '',
      width: '150px',
    }];
  const onSelectChange = (selectedRowKeys) => {
    dispatch({ type: 'table01/selectedRowKeysReducer', payload: selectedRowKeys });
  };
  const rowSelection = {
    selectedRowKeys: selectedRowKeysArr,
    onChange: onSelectChange,
  };
  return (
    <div>
      <Alert message={`已选择${selectedRowKeysArr.length}项`} type="info" showIcon style={{ marginTop: '10px' }} />
      <Table
        columns={columns}
        dataSource={dataSource.data}
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
          pageSizeOptions: ['10', '20', '30', '40'], showSizeChanger: true,
          showTotal: function (total, range) { console.log(total) }, total: 40,
          hideOnSinglePage: true,
        }}
      />
    </div>

  );
}
// <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />
// PropTypes.Table01 = {
//   dataSource: PropTypes.array,
// };

// function mapStateToProps(state) {
//   const { list, selectedRowKeysArr } = state.table01;
//   return {
//     list,
//     selectedRowKeysArr,
//   };
// }
function mapStateToProps({ table01 }) {
  return table01;
}

export default connect(mapStateToProps)(Table01);
