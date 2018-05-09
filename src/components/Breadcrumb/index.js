import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';

const BreadcrumbAgent = (props) => {
  return (
    <Breadcrumb style={{ fontSize: '14px' }}>
      {
        props.data.map((v, i) => (
          <Breadcrumb.Item key={i}>
            {v.path ? (<Link to={v.path}>{v.name}</Link>) : v.name}
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  );
};

export default BreadcrumbAgent;
