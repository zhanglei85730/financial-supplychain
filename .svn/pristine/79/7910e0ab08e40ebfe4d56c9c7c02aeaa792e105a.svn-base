import React from 'react';
import { Button } from 'antd';

function ExportFileForm({ fields = {}, buttonLable = '导出', formAction = '', method = 'get' }) {
  return (
    <form action={formAction} method={method}>
      {
        Object.keys(fields).map((name, index) => {
          const values = Object.values(fields);
          if (values.length > 0) {
            return (<input name={name} value={values[index]} type='hidden' key={index} />);
          }
        })
      }
      <Button htmlType="submit" >{buttonLable}</Button>
    </form>
  );
}
export default ExportFileForm;
