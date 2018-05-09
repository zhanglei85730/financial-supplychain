import React from 'react';
import { Form, DatePicker } from 'antd';

const FormItem = Form.Item;
const { MonthPicker } = DatePicker;

function PeriodSelect({ id, label, form, formItems, unique }) {
  const { getFieldDecorator } = form;
  const monthPickerHandle = (date, dateString) => {
    //console.log(date, dateString);
  };
  return (
    <FormItem label="期间">
      {getFieldDecorator(id, [{ required: false }])(
        <MonthPicker onChange={monthPickerHandle} placeholder="选择日期" />
      )}

    </FormItem>
  );
}
export default PeriodSelect;
