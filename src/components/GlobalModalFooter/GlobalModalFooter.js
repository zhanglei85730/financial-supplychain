import React from 'react';
import { connect } from 'dva';
import { Button, Divider ,} from 'antd';
import PropTypes from 'prop-types';
import styles from './GlobalModalFooter.less';

function GlobalModalFooter({ dispatch, reduce, cancelAddModalHandle }) {
  // 隐藏modal
  const onClickCancle = () => {
    // 回调
    if (cancelAddModalHandle) {
      cancelAddModalHandle();
    }
    dispatch(reduce);
  };
  const marginLeft = { marginLeft: '10px' };
  return (
    <div className={styles.coustomModalFooter}>
      <Divider />
      <span>
        <Button type="primary" htmlType="submit">提交</Button>
        <Button onClick={onClickCancle} style={marginLeft}>取消</Button>
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
