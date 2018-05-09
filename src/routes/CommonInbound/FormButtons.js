import React from 'react';
import { Button, Form } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './style.css';
import CollapseBtn from '../../components/CollapseBtn/CollapseBtn.js';
import consts from '../../config/const.js';
import packageConst from './packageConst.js';
import * as util from '../../utils/util.js';

function FormButtons({
  dispatch,
  form,
  formCollapse,
  loading,
}) {
  // form提交事件
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, fieldsValue) => {
      let queryDate = {};
      let payloadData = {};
      const formparams = util.deleteJsonEmptyProps(fieldsValue);
      if (fieldsValue.hasOwnProperty('queryDate') && fieldsValue.queryDate && fieldsValue.queryDate.length > 1) {
        queryDate = `${fieldsValue.queryDate[0].format(`YYYY-MM-DD 00:00:00`)},${fieldsValue.queryDate[1].format('YYYY-MM-DD 23:59:59')}`;
        payloadData = Object.assign(
          formparams,
          consts.initPagination,
          { queryDate },
          { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize },
        );
      } else {
        payloadData = Object.assign(
          formparams,
          consts.initPagination,
          { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize },
        );
      }
      dispatch({ type: `${packageConst.modelNameSapce}/tableLoadingReduce`, payload: true });
      dispatch({
        type: `${packageConst.modelNameSapce}/tableData`,
        payload: payloadData,
      });
      dispatch({
        type: 'common/queryParamsReduce',
        payload: payloadData,
      });
      // 选择了查询条件 计算汇总
      dispatch({ type: `${packageConst.modelNameSapce}/getTableDataSum`, payload: payloadData });
    });
  };
  // 重置
  const restHandle = () => {
    form.resetFields();
  };
  // const linkTest = () => {
  //   dispatch(routerRedux.push('/freight'));
  // };
  return (
    <Form.Item>
      <span className={styles.searchFormBtns}>
        <Button type="primary" htmlType="submit" key="query" loading={loading} onClick={handleSubmit}>查询</Button>
        <Button onClick={restHandle} key="reset">重置</Button>
        {/* <Button onClick={linkTest} key="linkto">跳转</Button> */}
        <CollapseBtn
          action={`${packageConst.modelNameSapce}/formCollapseReduce`}
          dispatch={dispatch}
          formCollapse={formCollapse}
        />
      </span>
    </Form.Item >
  );
}
// props 检查
FormButtons.propsType = {
  dispatch: PropTypes.func.required,
  action: PropTypes.string.required,
  formCollapse: PropTypes.bool.required,
  form: PropTypes.object.required,
  loading: PropTypes.bool,
};
export default connect()(FormButtons);

