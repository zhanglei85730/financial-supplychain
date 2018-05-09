import React from 'react';
import { connect } from 'dva';
import { Layout, Icon, Divider } from 'antd';
import { Route } from 'dva/router';
import SideMenu from '../Menu/SideMenu.js';
import BreadcrumbAgent from '../Breadcrumb';
import menuNodes from '../../config/router.js';
import GlobalHeader from '../GlobalHeader';

const { Header, Content } = Layout;

function MainLayout({ children, iconCollapsed, dispatch, BreadcrumbData, isAuthorized }) {
  // 会传入props
  function toggle() {
    // const { iconCollapsed } = props;
    // 触发另一个组件action
    dispatch({ type: 'sideMenu/collapsed', payload: !iconCollapsed });
    dispatch({ type: 'mainLayout/changeIconCollapsed', payload: !iconCollapsed });
  }
  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      dispatch({ type: 'login/logout', payload: false });
    }
  };
  const breadcrumStyle = { padding: '0 20px' };
  const iconRightStyle = { marginLeft: '20px', fontSize: '20px' };
  const DividerStyle = { margin: '0 0 20px 0' };
  const contentStyle = { margin: '16px 16px', padding: '24px', boxSizing: 'border-box', background: '#fff', minHeight: '280px' };
  return (
    <Layout>
      <SideMenu />
      <Layout>
        <Header style={{ background: '#fff', padding: 0, height: 'auto' }}>
          <Icon
            className="trigger"
            type={iconCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle} style={iconRightStyle}
          />
          <GlobalHeader onMenuClick={handleMenuClick} />
          <Divider type="horizontal" style={DividerStyle} />
          <div style={breadcrumStyle}>
            <BreadcrumbAgent data={BreadcrumbData} />
            {menuNodes.map((route, index) => {
              // 兼容地址栏有无#
              return window.location.pathname === route.path || window.location.hash === `#${route.path}` ? (<Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />) : '';
            })}
          </div>
          {/* <PageTitle /> */}
        </Header>
        <Content style={contentStyle}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

function mapStateToProps({ mainLayout, common, login }) {
  // console.log('mapStateToProps:'+JSON.stringify(mainLayout))
  const BreadcrumbValue = common.breadcrumb;
  // 返回在键值就是组件接受的属性值
  return { ...mainLayout, BreadcrumbData: BreadcrumbValue, ...login };
}

export default connect(mapStateToProps)(MainLayout);
// export default wrappedMainLayout;
