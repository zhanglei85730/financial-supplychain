import React from 'react';
import { Input, Form } from 'antd';

const FormItem = Form.Item;
function GlobalInput({ form, ...rest }) {
  const { getFieldDecorator } = form;
  const { id, label, formCol, defaultValue, placeholder, ...inputRest } = rest;
  return (
    <FormItem label={label}>
      {getFieldDecorator(id, {
        initialValue: defaultValue,
      })(
        <Input {...inputRest} placeholder={placeholder || '如果批量请用逗号隔开'} />
        )}
    </FormItem>
  );
}

export default GlobalInput;
