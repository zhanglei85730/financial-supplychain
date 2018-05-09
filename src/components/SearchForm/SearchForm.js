import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Select, Option } from 'antd';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
  }
  // 组件初始化后开始验证
  /*  componentDidMount() {
     // To disabled submit button at the beginning.
     this.props.form.validateFields();
   } */

  // handleChange(value) {
  //   console.log(`selected ${value}`);
  // }

  // handleBlur() {
  //   console.log('blur');
  // }

  // handleFocus() {
  //   console.log('focus');
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件,
    // ['userName']参数只校验username的值
    this.props.form.validateFields(['id'], (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // table01为model的namespace,tableData为effects下方法，相当与异步的action
        this.props.dispatch({ type: 'table01/tableDataById', payload: { values } });
      }
    });
  }

  render() {
    // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit.bind(this)} >
        <FormItem>
          {getFieldDecorator('id', {
            rules: [{ required: true, message: '请输入搜索ID' }],
          })(<Input placeholder="请输入搜索ID" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('age', {
            rules: [{ required: true, message: 'Please input your age' }],
          })(<Input placeholder="输入年龄" />)}
        </FormItem>
        <FormItem>

          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            filterOption={(input, option) => {
              return (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0);
            }}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            搜索
            </Button>
        </FormItem>
      </Form>
    );
  }
}

// const saveFormData = {
//   onFieldsChange(props, changedFields) {
//     props.onChange(changedFields);
//   },
//   mapPropsToFields(props) {
//     return {
//       userName: Form.createFormField({
//         ...props.userName,
//         value: props.userName.value,
//       }),
//     };
//   },
//   onValuesChange(_, values) {
//     console.log(values);
//   },
// };

const SearchFormWarp = Form.create()(SearchForm);
// export default WrappedDownloadDetailForm;
// 必须要用connent方法才能与redux结合，才能用redux的dispatch
export default connect()(SearchFormWarp);

