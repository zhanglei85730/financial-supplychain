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
  const tdWidth = { width: 80 };
  const columns = [
    {
      title: '法人主体',
      key: 'legalPerson',
      dataIndex: 'legalPerson',
      width: 160,
    },
    {
      title: '部门',
      key: 'easDepartName',
      dataIndex: 'easDepartName',
      width: 200,
    }, {
      title: '成本中心',
      key: 'easCostcenterName',
      dataIndex: 'easCostcenterName',
      width: 250,
    },
    {
      title: '期间',
      key: 'period',
      dataIndex: 'period',
      width: 100,
    }, {
      title: '账号',
      key: 'accountName',
      dataIndex: 'accountName',
      ...tdWidth,
    }, {
      title: '大区',
      key: 'area',
      dataIndex: 'area',
      ...tdWidth,
    },
    {
      title: '仓库',
      key: 'taxRate',
      dataIndex: 'taxRate',
      ...tdWidth,
    },
    {
      title: 'FBASKU',
      key: 'fbasku',
      dataIndex: 'fbasku',
      width: 110,
    },
    {
      title: 'FNSKU',
      key: 'fnsku',
      dataIndex: 'fnsku',
      width: 130,
    }, {
      title: 'SKU',
      key: 'sku',
      dataIndex: 'sku',
      width: 150,
    }, {
      title: 'UPC',
      key: 'upc',
      dataIndex: 'upc',
      width: 110,
    }, {
      title: '核销状态',
      key: 'verifStatus',
      dataIndex: 'verifStatus',
      width: 130,
    }, {
      title: '期初数量',
      key: 'beginQuantity',
      dataIndex: 'beginQuantity',
      width: 130,
    }, {
      title: '入库数量',
      key: 'receivedQuantity',
      dataIndex: 'receivedQuantity',
      width: 150,
    }, {
      title: '销售数量',
      key: 'salesQuantity',
      dataIndex: 'salesQuantity',
      width: 200,
    }, {
      title: '退货数量',
      key: 'returnsQuantity',
      dataIndex: 'returnsQuantity',
      width: 100,
    }, {
      title: '盘盈数量',
      key: 'intoQuantity',
      dataIndex: 'intoQuantity',
      ...tdWidth,
    }, {
      title: '盘亏数量',
      key: 'outQuantity',
      dataIndex: 'outQuantity',
      width: 150,
    }, {
      title: '销毁数量',
      key: 'destroyQuantity',
      dataIndex: 'destroyQuantity',
      ...tdWidth,
    }, {
      title: '退仓数量',
      key: 'removalQuantity',
      dataIndex: 'removalQuantity',
      width: 150,
    }, {
      title: '期末数量',
      key: 'endQuantity',
      dataIndex: 'endQuantity',
      ...tdWidth,
    }, {
      title: '差异数量',
      key: 'differenceQuantity',
      dataIndex: 'differenceQuantity',
      width: 150,
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
    // dispatch({ type: `${packageConst.modelNameSapce}/tableData`, payload: { offset: 0, limit: size } });
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
        scroll={Object.assign(consts.globalTableScroll, { x: 3100 })}
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

