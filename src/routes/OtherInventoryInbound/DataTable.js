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
  const tdWidth = { width: 150 };
  const columns = [
    {
      title: '过账日期',
      key: 'accountDate',
      dataIndex: 'accountDate',
      width: 220,
    }, {
      title: '业务日期',
      key: 'bizDate',
      dataIndex: 'bizDate',
      width: 220,
    }, {
      title: '单据编号',
      key: 'sourceBillId',
      dataIndex: 'sourceBillId',
      width: 210,
    }, {
      title: '源单据编号',
      key: 'sourceDocumentNumber',
      dataIndex: 'sourceDocumentNumber',
      width: 160,
    }, {
      title: '法人主体',
      key: 'orignLegalEntity',
      dataIndex: 'orignLegalEntity',
      width: 210,
    },
    {
      title: '部门',
      key: 'adminOrgUnit',
      dataIndex: 'adminOrgUnit',
      width: 200,
    }, {
      title: '成本中心',
      key: 'costCenterOrgUnit',
      dataIndex: 'costCenterOrgUnit',
      width: 250,
    }, {
      title: '来源类型',
      key: 'sourceType',
      dataIndex: 'sourceType',
      width: 250,
    }, {
      title: '业务系统单据分录Id',
      key: 'bizBillEntryId',
      dataIndex: 'bizBillEntryId',
      width: 250,
    }, {
      title: '业务系统单据分录来源Id',
      key: 'bizBillSrcEntryId',
      dataIndex: 'bizBillSrcEntryId',
      width: 270,
    }, {
      title: '推送状态',
      key: 'pushStatus',
      dataIndex: 'pushStatus',
      width: 250,
    }, {
      title: '出库类型',
      key: 'warehouseType',
      dataIndex: 'warehouseType',
      width: 250,
    },
    {
      title: '事务类型',
      key: 'transactionType',
      dataIndex: 'transactionType',
      width: 140,
    }, {
      title: '事务编码',
      key: 'transactionCode',
      dataIndex: 'transactionCode',
      width: 140,
    },
    {
      title: 'SKU',
      key: 'sku',
      dataIndex: 'sku',
      width: 180,
    }, {
      title: '数量',
      key: 'qty',
      dataIndex: 'qty',
      ...tdWidth,
    }, {
      title: '物料',
      key: 'material',
      dataIndex: 'material',
      ...tdWidth,
    },
    {
      title: '计量单位',
      key: 'unit',
      dataIndex: 'unit',
      ...tdWidth,
    },
    {
      title: '源仓库',
      key: 'orignStoreName',
      dataIndex: 'orignStoreName',
      width: 160,
    }, {
      title: 'eas仓库',
      key: 'storeName',
      dataIndex: 'storeName',
      width: 110,
    }, {
      title: '创建人',
      key: 'creator',
      dataIndex: 'creator',
      width: 110,
    }, {
      title: '推送人',
      key: 'pushCreatorName',
      dataIndex: 'pushCreatorName',
      width: 110,
    }, {
      title: '创建时间',
      key: 'createDate',
      dataIndex: 'createDate',
      width: 200,
    }, {
      title: '推送时间',
      key: 'pushDate',
      dataIndex: 'pushDate',
      width: 110,
    }, {
      title: '错误信息',
      key: 'errorMessage',
      dataIndex: 'errorMessage',
      width: 110,
    },
  ];

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRowKeys`, payload: selectedRowKeys });
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRows`, payload: selectedRows });
  };
  const rowSelection = {
    selectedRowKeys: selectedRowKeysArr,
    onChange: onSelectChange,
    getCheckboxProps: record => ({
      disabled: record.accountDate === '本页合计' || record.accountDate === '全部合计',
      name: record.name,
    }),
  };
  const changePaginationHandle = (page, pageSize) => {
    changePagination(page, pageSize, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  const pageSizeChangeHandle = (current, size) => {
    // dispatch({ type: `${packageConst.modelNameSapce}/tableData`, payload: { offset: 0, limit: size } });
    changePagination(current, size, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  return (
    <div>
      <Alert message={`已选择${selectedRowKeysArr.length}项`} type="info" showIcon style={{ marginTop: '10px' }} />
      <Table
        columns={columns}
        // dataSource={list}
        dataSource={list}
        // bordered
        // table必须有key属性，可以将设置id为key
        rowKey="id"
        rowSelection={rowSelection}
        loading={loading}
        className="nestedTable"
        style={{ marginTop: '20px' }}
        scroll={Object.assign(consts.globalTableScroll, { x: 3700 })}
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

