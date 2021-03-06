import React from 'react';
import { Table, Alert } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import consts from '../../config/const.js';
import { changePagination, decimalTo4, decimalTo2, taxRateFormater } from '../../utils/util.js';
import packageConst from './packageConst.js';

function DataTable({
  dispatch,
  list,
  loading,
  selectedRowKeysArr,
  total,
  queryParams,
}) {
  const tdWidth = { width: 120 };
  const columns = [
    {
      title: '过账时间',
      key: 'accountTime',
      dataIndex: 'accountTime',
      width: 180,
    }, {
      title: '源法人主体',
      key: 'orignLegalEntity',
      dataIndex: 'orignLegalEntity',
      width: 150,
    },
    {
      title: '单据编号',
      key: 'documentNumber',
      dataIndex: 'documentNumber',
      width: 200,
    }, {
      title: '源单据编号',
      key: 'sourceDocumentNumber',
      dataIndex: 'sourceDocumentNumber',
      width: 200,
    }, {
      title: '部门',
      key: 'department',
      dataIndex: 'department',
      width: 250,
    },
    {
      title: '成本中心',
      key: 'costCenter',
      dataIndex: 'costCenter',
      width: 100,
    },
    {
      title: '源仓库',
      key: 'orignStoreName',
      dataIndex: 'orignStoreName',
      width: 140,
    }, {
      title: '来源类型',
      key: 'sourceType',
      dataIndex: 'sourceType',
      ...tdWidth,
    }, {
      title: '入库类型',
      key: 'warehouseType',
      dataIndex: 'warehouseType',
      width: 140,
    },
    {
      title: 'SKU',
      key: 'sku',
      dataIndex: 'sku',
      width: 140,
    },
    {
      title: 'UPC',
      key: 'upc',
      dataIndex: 'upc',
      width: 200,
    },
    {
      title: '数量',
      key: 'qty',
      dataIndex: 'qty',
      width: 130,
    },
    {
      title: '业务日期',
      key: 'bizDate',
      dataIndex: 'bizDate',
      width: 110,
    },
    {
      title: '入库类型',
      key: 'warehouseType',
      dataIndex: 'warehouseType',
      width: 130,
    },
    {
      title: '事务类型',
      key: 'transactionType',
      dataIndex: 'transactionType',
      width: 130,
    },
    {
      title: '审核状态',
      key: 'approveStatus',
      dataIndex: 'approveStatus',
      width: 130,
    },
    {
      title: '创建人',
      key: 'creatorName',
      dataIndex: 'creatorName',
      width: 130,
    },
    {
      title: '更新人',
      key: 'updatorName',
      dataIndex: 'updatorName',
      width: 130,
    }, {
      title: '审核人',
      key: 'approveCreatorName',
      dataIndex: 'approveCreatorName',
      width: 130,
    }, {
      title: '创建时间',
      key: 'createDate',
      dataIndex: 'createDate',
      width: 130,
    }, {
      title: '更新时间',
      key: 'updateDate',
      dataIndex: 'updateDate',
      width: 130,
    }, {
      title: '审核时间',
      key: 'approveCreatorDate',
      dataIndex: 'approveCreatorDate',
      width: 130,
    }, {
      title: '拉取时间',
      key: 'pullDate',
      dataIndex: 'pullDate',
      width: 130,
    }, {
      title: '缺失数据错误信息',
      key: 'dataErrorMess',
      dataIndex: 'dataErrorMess',
      width: 160,
    }];


  const onSelectChange = (selectedRowKeys, selectedRows) => {
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRowKeys`, payload: selectedRowKeys });
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRows`, payload: selectedRows });
  };
  const rowSelection = {
    selectedRowKeys: selectedRowKeysArr,
    onChange: onSelectChange,
    getCheckboxProps: record => ({
      disabled: record.createDate === '本页合计' || record.createDate === '全部合计',
      name: record.name,
    }),
  };
  const changePaginationHandle = (page, pageSize) => {
    changePagination(page, pageSize, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  const pageSizeChangeHandle = (current, size) => {
    changePagination(current, size, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  return (
    <div>
      <Alert message={`已选择${selectedRowKeysArr.length}项`} type="info" showIcon style={{ marginTop: '10px' }} />
      <Table
        columns={columns}
        dataSource={list}
        rowKey="id"
        rowSelection={rowSelection}
        loading={loading}
        className="nestedTable"
        style={{ marginTop: '20px' }}
        scroll={Object.assign(consts.globalTableScroll, { x: 4000 })}
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
DataTable.PropTypes = {
  queryParams: PropTypes.object,
};
export default connect()(DataTable);

