import React from 'react';
import { Table, Alert } from 'antd';
import PropTypes from 'prop-types';
import packageConst from './packageConst.js';
import consts from '../../config/const.js';
import { changePagination, decimalTo4, decimalTo2 } from '../../utils/util.js';

function DataTable({
  dispatch,
  list,
  loading,
  selectedRowKeysArr,
  total,
  queryParams,
  }) {
  const tdWidth = { width: 80 };
  const columns = [{
    title: '报关日期',
    key: 'declareDate',
    dataIndex: 'declareDate',
    width: 160,
  },
  {
    title: '报关法人主体',
    dataIndex: 'declareLegalName',
    key: 'declareLegalName',
    width: 150,
  },
  {
    title: '报关单号',
    dataIndex: 'declareOrderId',
    key: 'declareOrderId',
    width: 150,
  }, {
    title: '原始报关数量',
    dataIndex: 'declareOralNum',
    key: 'declareOralNum',
    width: 200,
  }, {
    title: '原始报关币别',
    dataIndex: 'declareOralCurrency',
    key: 'declareOralCurrency',
    ...tdWidth,
  }, {
    title: '原始报关金额',
    dataIndex: 'declareOralMoeny',
    key: 'declareOralMoeny',
    ...tdWidth,
  }, {
    title: '差异数量',
    dataIndex: 'differNum',
    key: 'differNum',
    width: 110,
  }, {
    title: '差异金额',
    dataIndex: 'differMoney',
    key: 'differMoney',
    ...tdWidth,
    render: decimalTo2,
    align: consts.right,
  },
  {
    title: ' 状态',
    dataIndex: 'status',
    key: 'status',
    width: 110,
    render: decimalTo2,
    align: consts.right,
  }, {
    title: '错误类型',
    dataIndex: 'error',
    key: 'error',
    width: 110,
  },
  {
    title: '创建人',
    dataIndex: 'creater',
    key: 'creater',
    width: 140,
    render: decimalTo2,
    align: consts.right,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
    width: 200,
    align: consts.right,
  }];

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRowKeys`, payload: selectedRowKeys });
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRows`, payload: selectedRows });
  };
  const rowSelection = {
    selectedRowKeys: selectedRowKeysArr,
    onChange: onSelectChange,
    getCheckboxProps: record => ({
      disabled: record.billDate === '本页合计' || record.billDate === '全部合计',
      name: record.name,
    }),
  };
  const changePaginationHandle = (page, pageSize) => {
    changePagination(page, pageSize, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  const pageSizeChangeHandle = (current, size) => {
    // dispatch({ type: `${packageConst.modelNameSapce}/tableData`, payload: { offset: 0, limit: size } });
    changePagination(current, size, dispatch, `${packageConst.modelNameSapce}`);
  };
  return (
    <div>
      <Alert message={`已选择${selectedRowKeysArr.length}项`} type="info" showIcon style={{ marginTop: '10px' }} />
      <Table
        columns={columns}
        dataSource={list}
        className="nestedTable"
        // bordered
        // table必须有key属性，可以将设置id为key
        rowKey="id"
        rowSelection={rowSelection}
        loading={loading}
        style={{ marginTop: '20px' }}
        scroll={Object.assign(consts.globalTableScroll, { x: 3000 })}
        pagination={{
          total,
          defaultPageSize: consts.defaultPageSize,
          pageSizeOptions: consts.pageSizeOptions,
          showSizeChanger: true,
          hideOnSinglePage: false,
          onChange: changePaginationHandle,
          onShowSizeChange: pageSizeChangeHandle,
          showTotal: () => (consts.GlobalShowTotal(total)),
        }}

      />
    </div>
  );
}
DataTable.propTypes = {
  queryParams: PropTypes.object,
};

export default DataTable;
