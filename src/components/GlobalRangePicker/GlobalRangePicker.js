import React from 'react';
import { Form, DatePicker } from 'antd';
import styles from './GlobalRangePicker.css';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
function GlobalRangePicker({ form, ...rest }) {
  const { getFieldDecorator } = form;
  const { id, label, ...RangePickerRest } = rest;
  return (
    <FormItem label={label}>
      {getFieldDecorator(id, [{ required: false }])(
        <RangePicker {...RangePickerRest} />
      )}
    </FormItem>
  );
}

export default GlobalRangePicker;
