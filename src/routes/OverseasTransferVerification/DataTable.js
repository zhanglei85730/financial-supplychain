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
      title: '过账时间',
      key: 'postDate',
      dataIndex: 'postDate',
      width: 160,
    }, {
      title: '法人主体',
      key: 'corporateName',
      dataIndex: 'corporateName',
      width: 160,
      // fixed: 'left',
    }, {
      title: '核销单号',
      key: 'verifityNumber',
      dataIndex: 'verifityNumber',
      width: 150,
    },
    {
      title: '部门',
      key: 'departmentName',
      dataIndex: 'departmentName',
      width: 200,
    },
    // {
    //   title: '成本中心',
    //   key: 'corporationName',
    //   dataIndex: 'corporationName',
    //   width: 200,
    // },
    {
      title: '单据时间',
      key: 'createdDate',
      dataIndex: 'createdDate',
      width: 250,
    }, {
      title: '调拨单号',
      key: 'transferNumber',
      dataIndex: 'transferNumber',
      width: 250,
    },
    {
      title: '出库仓',
      key: 'outWarehouseName',
      dataIndex: 'outWarehouseName',
      width: 100,
    }, {
      title: '在途仓',
      key: 'onWayWarehouseName',
      dataIndex: 'onWayWarehouseName',
      width: 100,
    }, {
      title: '入库仓',
      key: 'inWarehouseName',
      dataIndex: 'inWarehouseName',
      ...tdWidth,
    }, {
      title: '柜号',
      key: 'cabinetNumber',
      dataIndex: 'cabinetNumber',
      ...tdWidth,
    },
    {
      title: '运输方式',
      key: 'transportMethod',
      dataIndex: 'transportMethod',
      ...tdWidth,
      render: (value) => {
        if (!value) { return ''; }
        let result = '';
        switch (value) {
          case '0':
            result = '空运';
            break;
          case '1':
            result = '海运 ';
            break;
          case '2':
            result = '快递 ';
            break;
          case '3':
            result = '铁运';
            break;
          case '4':
            result = '无';
            break;
          default:
            result = value;
        }
        return result;
      },
    },
    {
      title: 'SKU',
      key: 'skuName',
      dataIndex: 'skuName',
      width: 110,
    }, {
      title: 'UPC',
      key: 'upc',
      dataIndex: 'upc',
      width: 110,
    },
    {
      title: '核销数量',
      key: 'verifityQuantity',
      dataIndex: 'verifityQuantity',
      width: 130,
    }, {
      title: '核销类型',
      key: 'verifityType',
      dataIndex: 'verifityType',
      width: 150,
    }, {
      title: '核销金额',
      key: 'verifityAmount',
      dataIndex: 'verifityAmount',
      width: 150,
    }, {
      title: '核销状态',
      key: 'verifityStatus',
      dataIndex: 'verifityStatus',
      width: 150,
      render: (value) => {
        if (!value) { return ''; }
        let result = '';
        switch (value) {
          case '0':
            result = '待审核';
            break;
          case '1':
            result = '待过账 ';
            break;
          case '2':
            result = '核销完结 ';
            break;
          default:
            result = value;
        }
        return result;
      },
    }, {
      title: '申请人',
      key: 'applicantUserName',
      dataIndex: 'applicantUserName',
      width: 110,
    }, {
      title: '审核人',
      key: 'verifityUserName',
      dataIndex: 'verifityUserName',
      width: 130,
    }, {
      title: '审核时间',
      key: 'verifityDate',
      dataIndex: 'verifityDate',
      width: 150,
    }, {
      title: '过账人',
      key: 'postUserName',
      dataIndex: 'postUserName',
      width: 100,
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
        // dataSource={list}
        dataSource={list}
        // bordered
        // table必须有key属性，可以将设置id为key
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

