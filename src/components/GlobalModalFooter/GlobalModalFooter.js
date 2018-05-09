import React from 'react';
import { connect } from 'dva';
import { Button, Divider } from 'antd';
import PropTypes from 'prop-types';
import styles from './GlobalModalFooter.less';

function GlobalModalFooter({ dispatch, cancelModlaAction, cancelAddModalHandle }) {
  // 隐藏modal
  const onClickCancle = () => {
    // 回调
    if (cancelAddModalHandle) {
      cancelAddModalHandle();
    }
    dispatch({ type: cancelModlaAction, payload: false });
  };
  return (
    <div className={styles.coustomModalFooter}>
      <Divider />
      <span style={{ float: 'right' }}>
        <Button type="primary" htmlType="submit">提交</Button>
        <Button onClick={onClickCancle}>取消</Button>
      </span >
    </div>
  );
}
GlobalModalFooter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  cancelModlaAction: PropTypes.string.isRequired,
  cancelAddModalHandle: PropTypes.func,
};
export default connect()(GlobalModalFooter);
