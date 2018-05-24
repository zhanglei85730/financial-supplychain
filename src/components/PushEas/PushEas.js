import React from 'react';
import { Button, message } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './PushEas.css';
import { formParamsFormater, hasProperty } from '../../utils/util.js';

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
  moduleModelNameSapce,
  wsUrl,
  pushEasUrlMethod,
  pushEasCondition,
  commonPaginnation,
  fetchUUIDUrl,
      }) {
  // 推送到金蝶
  const pushEasHandle = () => {
    // ids参数为必须
    if (pushEasCondition === 'selectRows' && selectedRowsArr.length === 0) {
      message.error('请选择数据再推送');
      return false;
    }
    dispatch({ type: modalShowReduce, payload: true });
    const selectRows = selectedRowsArr;
    const selectRowsIds = [];
    form.validateFields((err, fieldsValue) => {
      const formParams = formParamsFormater(fieldsValue);
      if (selectRows.length > 0) {
        selectRows.forEach((item) => {
          if (hasProperty(item, 'pId')) {
            selectRowsIds.push(item.pId);
          } else if (hasProperty(item, 'id')) {
            selectRowsIds.push(item.id);
          }
        });
        Object.assign(formParams, { ids: selectRowsIds.join(',') });
      }
      dispatch({ type: 'common/pushEasClearResponseRedece' });
      dispatch({
        type: pushReduce,
        payload: {
          params: formParams,
          dispatchMethod: dispatch,
          messages: pushEasResponse,
          modelNameSapce,
          pushEasName,
          wsUrl,
          pushEasUrl,
          moduleModelNameSapce,
          pushEasUrlMethod,
          commonPaginnation,
          fetchUUIDUrl,
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
PushEas.propTypes = {
  selectedRowsArr: PropTypes.array,
};
// export default PushEas;
function mapStateToProps({ common }) {
  const { commonPaginnation } = common;
  return { commonPaginnation };
}
export default connect(mapStateToProps)(PushEas);
