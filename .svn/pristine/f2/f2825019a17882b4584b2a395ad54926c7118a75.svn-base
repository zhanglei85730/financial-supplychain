import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Select, DatePicker, Icon, Row, Col } from 'antd';
import moment from 'moment';
import style from '../../../config/global.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMore: 'none',
    };
  }
  // 展开更多收缩条件
  toggleSearchMoreInfo = () => {
    const searchMoreValue = this.state.searchMore === 'none' ? 'block' : 'none';
    this.setState({ searchMore: searchMoreValue });
  }
  // 组件初始化后开始验证
  handleSubmit = (e) => {
    const dateFormat = 'YYYY-MM-DD';
    e.preventDefault();
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件,
    // ['userName']参数只校验username的值
    this.props.form.validateFields((err, fieldsValue) => {
      const values = {
        ...fieldsValue,
        createDate: fieldsValue.createDate ? ([fieldsValue.createDate[0].format(dateFormat), fieldsValue.createDate[1].format(dateFormat)]) : [],
        departs: fieldsValue.departs ? fieldsValue.departs.join(',') : '',
        accounts: fieldsValue.accounts ? fieldsValue.accounts.join(',') : '',
      };
      // 提交
      this.props.dispatch({ type: 'table01/search', payload: values });
    });
  }

  render() {
    // const config = {
    //   rules: [{ type: 'object', required: false, message: 'Please select time!' }],
    // };
    // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY/MM/DD';
    return (
      <Form layout="inline" onSubmit={this.handleSubmit.bind(this)} className={style.coustomFormLyout}>
        <Row>
          <Col md={5} sm={24}>
            <FormItem label="选择日期">
              {getFieldDecorator('createDate', [{ required: false }])(
                <RangePicker
                  format={dateFormat}
                />,
              )}

            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            {/* 账号选择 */}
            <FormItem label="选择账号">
              {getFieldDecorator('accounts', [{ required: false }])(
                <Select
                  placeholder="请选择"
                  optionFilterProp="children"
                  mode="multiple"
                >
                  <Option value="onemoregood">onemoregood</Option>
                  <Option value="Shuibaobao">Shuibaobao</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              )}

            </FormItem>
          </Col>
          <Col md={5} sm={24}>
            {/* 账号选择 */}
            <FormItem label="所在部门">
              {getFieldDecorator('departs', [{ required: false }])(
                <Select
                  placeholder="选择部门"
                  optionFilterProp="children"
                  mode="multiple"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              )}

            </FormItem>
          </Col>
          <Col md={9} sm={24}>
            {/* 账号选择 */}
            <Button type="primary" htmlType="submit">查询</Button>
            <Button type="primary" >审核通过</Button>
            <Button>审核驳回</Button>
            <Button>批量下载</Button>
            <Button>重置</Button>
            <a className={style.cursor} onClick={this.toggleSearchMoreInfo.bind(this)} style={{ marginLeft: '10px' }}>展开<Icon type={this.state.searchMore === 'none' ? 'up' : 'down'} /></a>
          </Col>
        </Row>


        {/* <FormItem>
          {getFieldDecorator('age', {
            rules: [{ required: true, message: 'Please input your age' }],
          })(<Input placeholder="输入年龄" />)}
        </FormItem> */}
        {/* <FormItem>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            filterOption={(input, option) => {
              return (option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0)
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
        </FormItem> */}
        <div style={{ display: this.state.searchMore }}>
          <Row>
            <Col md={5} sm={24}>
              <FormItem label="下载状态">
                <Select
                  placeholder="请选择"
                  optionFilterProp="children"
                  mode="multiple"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </FormItem>
            </Col>
            <Col md={5} sm={24}>
              <FormItem label="审批状态">
                <Select
                  placeholder="请选择"
                  optionFilterProp="children"
                  mode="multiple"
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </FormItem>
            </Col>
            <Col md={5} sm={24}>
              <FormItem label="失败原因">
                <Select
                  placeholder="请选择"
                  optionFilterProp="children"
                  mode="multiple"
                  filterOption={(input, option) => (
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  )}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </div>
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
// }

const SearchFormWarp = Form.create()(SearchForm);
// export default WrappedDownloadDetailForm;
// 必须要用connent方法才能与redux结合，才能用redux的dispatch
export default connect()(SearchFormWarp);

