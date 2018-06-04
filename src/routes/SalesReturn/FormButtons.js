import React from 'react';
import { Button, Form, Checkbox } from 'antd';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './style.less';
import CollapseBtn from '../../components/CollapseBtn/CollapseBtn.js';
import consts from '../../config/const.js';
import packageConst from './packageConst.js';
import { formParamsFormater } from '../../utils/util.js';

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
      const formparams = formParamsFormater(fieldsValue);
      const payloadData = Object.assign(
        formparams,
        consts.initPagination,
        { offset: 0, limit: consts.defaultPageSize - consts.extraPageSize },
      );
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
  const { getFieldDecorator } = form;
  return (
    <Form.Item>
      <span className={styles.searchFormBtns}>
        {getFieldDecorator('dataError', {
          valuePropName: 'false',
          initialValue: 'N',
        })(
          <Checkbox>异常数据</Checkbox>
          )}
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

