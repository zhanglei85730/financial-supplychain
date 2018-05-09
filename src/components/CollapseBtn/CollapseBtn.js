import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './CollapseBtn.css';

function CollapseBtn({ action, dispatch, formCollapse }) {
  const toggleSearchMoreInfo = () => {
    dispatch({ type: action, payload: !formCollapse });
  };
  return (
    <span className={styles.normal}>
      {
        <a onClick={toggleSearchMoreInfo}>展开<Icon type={formCollapse ? 'up' : 'down'} /></a>
      }
    </span>
  );
}
// props 检查
CollapseBtn.propsType = {
  dispatch: PropTypes.func.required,
  action: PropTypes.string.required,
  formCollapse: PropTypes.bool.required,
};

export default CollapseBtn;
