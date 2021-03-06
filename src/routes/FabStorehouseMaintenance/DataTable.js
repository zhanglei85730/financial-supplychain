import React from 'react';
import { connect } from 'dva';
import { Table, Alert, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import packageConst from './packageConst.js';
import consts from '../../config/const.js';
import { changePagination, decimalTo4, decimalTo2, formParamsFormater } from '../../utils/util.js';

const FormItem = Form.Item;

function EditCell(value, row, index, editRowIndex, form, editStatu, dataIndex) {
  const { getFieldDecorator } = form;
  return (
    editStatu && index === editRowIndex ? <FormItem>
      {getFieldDecorator(dataIndex || 'few', {
        rules: [
          {
            // required: true,
            message: `Please Input!`,
          },
        ],
        initialValue: value,
      })(<Input size="small" />)}
    </FormItem> : value
  );
}

class DataTable extends React.Component {
  constructor() {
    super();
    this.state = {
      tablecolumns: this.columns,
      editStatu: false,
      editRowIndex: '',
      dataIndex: '',
      editRow: null,
    };
    this.saveHandle = this.saveHandle.bind(this);
  }
  // render method
  renderHandel(value, row, index, dataIndex) {
    return (
      EditCell(value, row, index, this.state.editRowIndex, this.props.form, this.props.modifyStatus, dataIndex)
    );
  }
  // 保存
  saveHandle() {
    Modal.confirm({
      title: 'Confirm',
      content: '确认要修改数据吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        this.props.form.validateFields((err, fieldsValue) => {
          if (err) {
            return false;
          }
          const { id } = this.state.editRow;
          Object.assign(fieldsValue, { id });
          this.props.dispatch({ type: `${packageConst.modelNameSapce}/modify`, payload: formParamsFormater(fieldsValue) });
        });
      },
      onCancel: () => {
        this.props.dispatch({ type: `${packageConst.modelNameSapce}/modifyStatusReduce`, payload: false });
      },
    });
  }
  tdWidth = { width: 80 }
  columns = [{
    title: '大区',
    key: 'area',
    dataIndex: 'area',
    ...this.tdWidth,
    render: (value, row, index) => {
      return this.renderHandel(value, row, index, 'warehouseName');
    },
  },
  {
    title: '大区ID',
    key: 'areaId',
    dataIndex: 'areaId',
    ...this.tdWidth,
    render: (value, row, index) => {
      return this.renderHandel(value, row, index, 'warehouseId');
    },
  },
  {
    title: '部门',
    key: 'kisWarehouseName',
    dataIndex: 'kisWarehouseName',
    ...this.tdWidth,
    render: (value, row, index) => {
      return this.renderHandel(value, row, index, 'kisWarehouseName');
    },
  }, {
    title: '部门ID',
    key: 'kisWarehouseId',
    dataIndex: 'kisWarehouseId',
    ...this.tdWidth,
    render: (value, row, index) => {
      return this.renderHandel(value, row, index, 'kisWarehouseId');
    },
  }, {
    title: '成本中心',
    key: 'easCostcenterName',
    dataIndex: 'easCostcenterName',
    ...this.tdWidth,
  }, {
    title: '成本中心ID',
    key: 'easCostcenterCode',
    dataIndex: 'easCostcenterCode',
    ...this.tdWidth,
  }, {
    title: '店铺',
    key: 'account',
    dataIndex: 'account',
    ...this.tdWidth,
  }, {
    title: '店铺ID',
    key: 'accountId',
    dataIndex: 'accountId',
    width: 150,
  }, {
    title: '金蝶仓库名称',
    key: 'easWarehouseName',
    dataIndex: 'easWarehouseName',
    width: 150,
  }, {
    title: '金蝶仓库ID',
    key: 'easWarehouseCode',
    dataIndex: 'vv',
    width: 150,
  }, {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    width: 150,
  }, {
    title: '创建人',
    key: 'creatorName',
    dataIndex: 'creatorName',
    width: 150,
  }, {
    title: '创建时间',
    key: 'createDate',
    dataIndex: 'createDate',
    width: 150,
  }, {
    title: '更新人',
    key: 'updatorName',
    dataIndex: 'updatorName',
    width: 150,
  }, {
    title: '更新日期',
    key: 'updateDate',
    dataIndex: 'updateDate',
    width: 150,
  }, {
    title: '操作',
    dataIndex: '',
    key: '',
    ...this.tdWidth,
    fixed: 'right',
    render: (value, row, index) => {
      return (
        <span>
          <a
            onClick={() => {
              this.setState({
                editRowIndex: index,
                editStatu: true,
                editRow: row,
              });
              this.props.dispatch({ type: `${packageConst.modelNameSapce}/modifyStatusReduce`, payload: true });
            }}
          >修改</a>
          {
            this.state.editRowIndex === index && this.props.modifyStatus ? (
              <a onClick={this.saveHandle} style={{ marginLeft: '10px' }}>保存</a>
            ) : ''
          }
        </span>

      );
    },
  }];
  render() {
    const {
      dispatch,
      list,
      loading,
      selectedRowKeysArr,
      total,
      queryParams,
      form,
      } = this.props;

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
          columns={this.state.tablecolumns}
          dataSource={list}
          className="nestedTable"
          // bordered
          // table必须有key属性，可以将设置id为key
          rowKey="id"
          rowSelection={rowSelection}
          loading={loading}
          style={{ marginTop: '20px' }}
          scroll={Object.assign(consts.globalTableScroll, { x: 2100 })}
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
}
DataTable.propTypes = {
  queryParams: PropTypes.object,
};
function mapStateToProps({ fabStorehouseMaintenance }) {
  return fabStorehouseMaintenance;
}
const FormWrapped = Form.create()(DataTable);
export default connect(mapStateToProps)(FormWrapped);
