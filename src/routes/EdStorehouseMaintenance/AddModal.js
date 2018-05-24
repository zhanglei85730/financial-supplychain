import React from 'react';
import { Form, Input } from 'antd';
import { connect } from 'dva';
import packageConst from './packageConst.js';
import GlobalModalFooter from '../../components/GlobalModalFooter/GlobalModalFooter.js';

const FormItem = Form.Item;
// 隐藏modal action
const modalCancleHandle = { type: `${packageConst.modelNameSapce}/addModalReduce`, payload: false }
function AddModal({ dispatch, form }) {
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      dispatch({ type: 'businessTypeMaintenance/add', payload: values });
      // console.log('Received values of form: ', values);
    });
  };
  const placeholderText = '请输入（必填）';
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label="E登仓库名称">
          {getFieldDecorator('warehouseName', {
            rules: [{
              required: true,
              message: placeholderText,
            }],
          })(
            <Input placeholder={placeholderText} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="E登仓库id">
          {getFieldDecorator('warehouseId', {
            rules: [{
              required: true,
              message: placeholderText,
            }],
          })(
            <Input placeholder={placeholderText} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="金蝶仓库名称">
          {getFieldDecorator('kisWarehouseName', {
            rules: [{
              required: true,
              message: placeholderText,
            }],
          })(
            <Input placeholder={placeholderText} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="金蝶仓库id">
          {getFieldDecorator('kisWarehouseId', {
            rules: [{
              required: true,
              message: 'Please input your nickname',
            }],
          })(
            <Input placeholder={placeholderText} />
            )}
        </FormItem>
        <FormItem {...formItemLayout}>
          <GlobalModalFooter
            reduce={modalCancleHandle}
          />
        </FormItem>
      </Form>
    </div>
  );
}
const AddModalWrapped = Form.create()(AddModal);
export default connect()(AddModalWrapped);
