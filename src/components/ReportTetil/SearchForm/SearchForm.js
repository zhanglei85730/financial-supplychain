import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Select, DatePicker, Icon, Row, Col, } from 'antd';
import moment from 'moment';
import style from '../../../config/global.less';

const FormItem = Form.Item;
const { RangePicker, MonthPicker } = DatePicker;
const Option = Select.Option;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
  }
  monthPickerHandle = (date, dateString) => {
    console.log(date, dateString);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // 校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件,
    // ['userName']参数只校验username的值
    this.props.form.validateFields(['age', 'createDate'], (err, values) => {
      if (!err) {
        const createDateFormat = values.createDate.format('YYYY-MM-DD')       
        // table01为model的namespace,tableData为effects下方法，相当与异步的action
        this.props.dispatch({ type: 'table01/search', payload: { values } });
      }
    });
  }

  render() {
    // const config = {
    //   rules: [{ type: 'object', required: false, message: 'Please select time!' }],
    // };
    // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY/MM/DD';
    const monthFormat = 'YYYY/MM';

    return (
      <Form layout="inline" onSubmit={this.handleSubmit.bind(this)} className={style.coustomFormLyout}>

        {/* <FormItem label="选择日期">
          {getFieldDecorator('createDate', config)(
            <DatePicker />,
          )}
        </FormItem> */}
        <Row>
          <Col md={5} sm={24}>
            <FormItem label="账单时间">
              <RangePicker
                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                format={dateFormat}
              />
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            <FormItem label="期间">
              <MonthPicker onChange={this.monthPickerHandle.bind(this)} placeholder="选择日期" />
            </FormItem>
          </Col>
          <Col md={4} sm={24}>
            {/* 账号选择 */}
            <FormItem label="账号">
              <Select
                placeholder="选择账号"
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
          <Col md={4} sm={24}>
            {/* 账号选择 */}
            <FormItem label="部门">
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
            </FormItem>
          </Col>
          <Col md={7} sm={24}>
            {/* 账号选择 */}
            <Button type="primary">查询</Button>
            <Button style={{ marginLeft: '10px' }}>生成汇总</Button>
            <Button style={{ marginLeft: '10px' }}>导出</Button>
            <Button style={{ marginLeft: '10px' }}>重新计算</Button>
          </Col>
        </Row>
      </Form>

    );
  }
}

const SearchFormWarp = Form.create()(SearchForm);
// export default WrappedDownloadDetailForm;
// 必须要用connent方法才能与redux结合，才能用redux的dispatch
export default connect()(SearchFormWarp);

