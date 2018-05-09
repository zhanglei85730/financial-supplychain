import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';

function GlobalHeader(props) {
  const { username } = props;
  return (
    <div style={{ float: 'right', marginRight: '50px' }}>
      <span>
        <Avatar style={{ backgroundColor: '#1890ff', marginLeft: '10px', marginRight: '4px' }} icon="user" size="small" />
        {username}
      </span>
    </div>
  );
}
function mapStateToProps({ globalHeader }) {
  return globalHeader;
}
export default connect(mapStateToProps)(GlobalHeader);
