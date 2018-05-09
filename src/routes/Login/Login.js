import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import Login from '../../components/Login';
import style from './index.css';

function WrappedLogin() {
  return (
    <div className={style.container}>
      <Row type="flex" justify="center" align="middle" style={{ marginTop: '100px' }}>
        <Col lg={7} md={10} sm={24}>
          <Login />
        </Col>
      </Row>

    </div>
  );
}

WrappedLogin.propTypes = {
};

export default connect()(WrappedLogin);
