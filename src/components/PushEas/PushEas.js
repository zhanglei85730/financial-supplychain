import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import styles from './PushEas.css';
import * as util from '../../utils/util.js';

function PushEas({
   buttonText,
  dispatch,
  modalShowReduce,
  pushReduce,
  form,
  pushEasName,
  modelNameSapce,
  selectedRowsArr,
  pushEasResponse,
  buttonType,
  style,
  pushEasUrl,
      }) {
  // 推送到金蝶
  const pushEasHandle = () => {
    dispatch({ type: modalShowReduce, payload: true });
    const selectRows = selectedRowsArr;
    const selectRowsIds = [];
    form.validateFields((err, fieldsValue) => {
      const formParams = util.deleteJsonEmptyProps(fieldsValue);
      if (selectRows.length > 0) {
        selectRows.forEach((item) => {
          if (util.hasProperty(item, 'pId')) {
            selectRowsIds.push(item.pId);
          } else if (util.hasProperty(item, 'id')) {
            selectRowsIds.push(item.id);
          }
        });
        Object.assign(formParams, { ids: selectRowsIds.join(',') });
      }
      dispatch({
        type: pushReduce,
        payload: {
          params: formParams,
          dispatchMethod: dispatch,
          messages: pushEasResponse,
          modelNameSapce,
          pushEasName,
          pushEasUrl,
        },
      });
    });
  };
  return (
    <div className={styles.normal}>
      <Button type={buttonType} style={style} onClick={pushEasHandle}>{buttonText}</Button>
    </div>
  );
}
PushEas.PropTypes = {
  selectedRowsArr: PropTypes.array,
};
export default PushEas;
