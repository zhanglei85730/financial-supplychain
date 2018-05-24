import React from 'react';
import { Checkbox, Row, Col } from 'antd';
import { connect } from 'dva';

function VerificationModal({ dispatch }) {
  const onChange = (checkedValues) => {
    dispatch({ type: "overseasTransferDetail/verificationTypeReduce", payload: checkedValues });
  };
  return (
    <div>
      <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
        <Row>
          <Col span={12}><Checkbox value="1">承运商丢货</Checkbox></Col>
          <Col span={12}><Checkbox value="2">后期反馈到货处理方案</Checkbox></Col>
        </Row>
        <Row>
          <Col span={12}><Checkbox value="3">发货差异(工厂发货)</Checkbox></Col>
          <Col span={12}><Checkbox value="4">查验退货香港</Checkbox></Col>
        </Row>
        <Row>
          <Col span={12}><Checkbox value="5">发货差异(华南城中转仓发货)</Checkbox></Col>
          <Col span={12}><Checkbox value="6">退货海外仓</Checkbox></Col>
        </Row>
        <Row>
          <Col span={12}><Checkbox value="7">查验少货</Checkbox></Col>
          <Col span={12}><Checkbox value="8">查验销毁</Checkbox></Col>
        </Row>
      </Checkbox.Group>,
    </div>
  );
}
export default connect()(VerificationModal);
