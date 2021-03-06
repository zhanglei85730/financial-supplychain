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
      dispatch({ type: `${packageConst.modelNameSapce}/add`, payload: values });
      // console.log('Received values of form: ', values);
    });
  };
  const placeholderText = '请输入（必填）';
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormItem {...formItemLayout} label="期间">
          {getFieldDecorator('period', {
            rules: [{
              required: true,
              message: placeholderText,
            }],
          })(
            <Input placeholder={placeholderText} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="SKU">
          {getFieldDecorator('sku', {
            rules: [{
              required: true,
              message: placeholderText,
            }],
          })(
            <Input placeholder={placeholderText} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="部门">
          {getFieldDecorator('easDepartName', {
            rules: [{
              required: true,
              message: placeholderText,
            }],
          })(
            <Input placeholder={placeholderText} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="成本中心">
          {getFieldDecorator('easCostcenterName', {
            rules: [{
              required: true,
              message: placeholderText,
            }],
          })(
            <Input placeholder={placeholderText} />
            )}
        </FormItem>
        <GlobalModalFooter
          reduce={modalCancleHandle}
        />
      </Form>
    </div>
  );
}
const AddModalWrapped = Form.create()(AddModal);
export default connect()(AddModalWrapped);
