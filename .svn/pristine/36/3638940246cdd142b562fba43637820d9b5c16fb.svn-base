import React from 'react';
import { Tabs } from 'antd';
import { connect } from 'dva';
import styles from './GlobalTab.less';
import menuNodes from '../../config/router.js';

const TabPane = Tabs.TabPane;

function GlobalTab({ dispatch, tabPaths, activeTabKey }) {
  // const currentPath = location.pathname;  
  const tabPanes = tabPaths.map((outItem) => {
    return menuNodes.filter((inneritem) => {
      return outItem.path === inneritem.path ? inneritem : '';
    })[0];
  });
  const onChangeHandle = (activeKey) => {
    dispatch({ type: 'globalTabs/locationChange', payload: activeKey });
  };
  const remove = (targetKey) => {
    const panes = tabPaths.filter(pane => pane.path !== `/${targetKey}`);
    const lastKey = panes[panes.length - 1].path;
    dispatch({ type: 'globalTabs/removeTab', payload: { tabPaths: panes, activeTabKey: lastKey.slice(1) } });
  };
  const onEditHandle = (targetKey, action) => {
    remove(targetKey);
  };
  return (
    <div className={styles.tabsMenu}>
      <Tabs
        type="editable-card"
        activeKey={activeTabKey}
        onChange={onChangeHandle}
        hideAdd
        onEdit={onEditHandle}
      >
        {
          tabPanes.map((item) => {
            return (<TabPane tab={item.title} key={item.key}><div className={styles.tabContentWrapeed}>{item.route}</div></TabPane>);
          })
        }
      </Tabs>
    </div>
  );
}

const mapStateToProps = ({ globalTabs }) => {
  return globalTabs;
};

export default connect(mapStateToProps)(GlobalTab);

