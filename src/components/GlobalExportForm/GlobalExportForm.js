import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './GlobalExportForm.css';
import { formParamsFormater, deleteJsonEmptyProps } from '../../utils/util.js';

function GlobalExportForm({
  form,
  url,
  dispatch,
  reduceName,
  exportInputs,
  buttonType,
  style,
  buttonText = '导出',
  isFormatDate,
  dateStartFormat,
  dateEndFormat,
  customDateFamat = {},
}) {

  // debugger
  if (exportInputs) {
    exportInputs = exportInputs || {};
  }
  const handleSubmit = (e) => {
    const eventKeyId = e.target.id;
    if (eventKeyId === 'export') {
      form.validateFields((err, fieldsValue) => {
        // 定义日期格式
        // Object.assign(formParams, customDateFamat);
        const formParams = formParamsFormater(fieldsValue, isFormatDate, dateStartFormat, dateEndFormat, customDateFamat);
        dispatch({ type: reduceName, payload: formParams });
      });
    }
  };
  return (
    <div className={styles.normal}>
      {/* action={url} */}
      {/* onClick={handleSubmit} */}
      <form action={url} method="get" onClick={handleSubmit}>
        {
          Object.keys(exportInputs).map((name, index) => {
            const values = Object.values(exportInputs);
            if (values.length > 0) {
              return (<input name={name} value={values[index]} type='hidden' key={index} />);
            }
          })
        }
        <Button htmlType="submit" id="export" style={style} className={styles.marginSpace} type={buttonType}>{buttonText}</Button>
      </form>
    </div>
  );
}
GlobalExportForm.propTypes = {
  url: PropTypes.string,
  reduceName: PropTypes.string,
  exportInputs: PropTypes.object,
};
export default GlobalExportForm;
