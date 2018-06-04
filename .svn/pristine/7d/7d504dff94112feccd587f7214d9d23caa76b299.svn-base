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
      title: '退货时间',
      key: 'returnDate',
      dataIndex: 'returnDate',
      width: 220,
      // fixed: 'left',
    }, {
      title: '订单号',
      key: 'orderId',
      dataIndex: 'orderId',
      width: 220,
    },
    {
      title: '单据编号',
      key: 'number',
      dataIndex: 'number',
      width: 200,
    },
    {
      title: '法人主体',
      key: 'orignLegalEntity',
      dataIndex: 'orignLegalEntity',
      width: 200,
    },{
      title: '推送状态',
      key: 'pushStatus',
      dataIndex: 'pushStatus',
      ...tdWidth,
    },
    {
      title: '部门',
      key: 'department',
      dataIndex: 'department',
      ...tdWidth,
    },
    {
      title: '成本中心',
      key: 'costCenterName',
      dataIndex: 'costCenterName',
      width: 110,
    },
    {
      title: 'eas部门',
      key: 'adminOrgUnit',
      dataIndex: 'adminOrgUnit',
      width: 130,
    }, {
      title: 'eas成本中心',
      key: 'costCenterOrgUnit',
      dataIndex: 'costCenterOrgUnit',
      width: 150,
    }, {
      title: '账号',
      key: 'accountName',
      dataIndex: 'accountName',
      width: 110,
    }, {
      title: '大区',
      key: 'area',
      dataIndex: 'area',
      width: 130,
    }, {
      title: 'FNSKU',
      key: 'fnsku',
      dataIndex: 'fnsku',
      width: 150,
    }, {
      title: 'asin',
      key: 'asin',
      dataIndex: 'asin',
      width: 200,
    }, {
      title: '亚马逊SKU',
      key: 'amazonSku',
      dataIndex: 'amazonSku',
      width: 180,
    }, {
      title: '公司SKU',
      key: 'companySku',
      dataIndex: 'companySku',
      width: 200,
    }, {
      title: 'UPC',
      key: 'material',
      dataIndex: 'material',
      width: 250,
    }, {
      title: '计量单位',
      key: 'unit',
      dataIndex: 'unit',
      ...tdWidth,
    }, {
      title: '仓库',
      key: 'easWarehouseName',
      dataIndex: 'easWarehouseName',
      width: 150,
    }, {
      title: '数量',
      key: 'quantity',
      dataIndex: 'quantity',
      width: 150,
    }, {
      title: '实际成本',
      key: 'actualCost',
      dataIndex: 'actualCost',
      width: 150,
      render: decimalTo2,
    }, {
      title: '入库类型',
      key: 'warehouseType',
      dataIndex: 'warehouseType',
      width: 150,
    }, {
      title: '事务类型',
      key: 'transactionType',
      dataIndex: 'transactionType',
      width: 150,
    }, {
      title: '事务类型编码',
      key: 'bizType',
      dataIndex: 'bizType',
      width: 150,
    }, {
      title: '业务日期',
      key: 'bizDate',
      dataIndex: 'bizDate',
      width: 150,
    }, {
      title: '推送人',
      key: 'pusherName',
      dataIndex: 'pusherName',
      width: 150,
    }, {
      title: '创建时间',
      key: 'createDate',
      dataIndex: 'createDate',
      width: 200,
    }, {
      title: '更新人',
      key: 'updatorName',
      dataIndex: 'updatorName',
      width: 150,
    }, {
      title: '错误信息',
      key: 'errorMessage',
      dataIndex: 'errorMessage',
      width: 150,
    }, {
      title: '缺失数据错误信息',
      key: 'dataErrorMess',
      dataIndex: 'dataErrorMess',
      width: 150,
    }];


  const onSelectChange = (selectedRowKeys, selectedRows) => {
    dispatch({ type: `${packageConst.modelNameSapce}/selectedRowKeys`, payload: selectedRowKeys });
    dispatch({
      type: `${packageConst.modelNameSapce}/selectedRows`,
      payload: selectedRows,
    });
  };
  const rowSelection = {
    selectedRowKeys: selectedRowKeysArr,
    onChange: onSelectChange,
    getCheckboxProps: record => ({
      disabled: record.returnDate === '本页合计' || record.returnDate === '全部合计',
      name: record.name,
    }),
  };
  const changePaginationHandle = (page, pageSize) => {
    // dispatch({ type: 'common/setCommonPaginnation', payload: {offset:page,limit:} })
    changePagination(page, pageSize, dispatch, `${packageConst.modelNameSapce}`, queryParams);
  };
  const pageSizeChangeHandle = (current, size) => {
    // dispatch({ type: `${ packageConst.modelNameSapce } / tableData`, payload: { offset: 0, limit: size } });
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
        scroll={Object.assign(consts.globalTableScroll, { x: 4500 })}
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

// export default DataTable;
export default connect()(DataTable);

