import React from 'react';
import { connect } from 'dva';
import Proptypes from 'prop-types';
import SearchForm from './SearchForm.js';
import DataTable from './DataTable.js';
import styles from './style.less';

class FabStorehouseMaintenance extends React.Component {
  render() {
    const {
      dispatch,
      formCollapse,
      selectedRowKeysArr,
      loading,
      list,
      total,
      queryParams,
      } = this.props;
    return (
      <div className={styles.normal}>
        <SearchForm
          dispatch={dispatch}
          formCollapse={formCollapse}
        />
        <DataTable
          dispatch={dispatch}
          list={list}
          loading={loading}
          selectedRowKeysArr={selectedRowKeysArr}
          total={total}
          queryParams={queryParams}
        />
      </div>
    );
  }
}

FabStorehouseMaintenance.proptypes = {
  queryParams: Proptypes.object,
};
function mapStateToProps({ fabStorehouseMaintenance, common }) {
  const { queryParams } = common;
  return { ...fabStorehouseMaintenance, queryParams };
}
export default connect(mapStateToProps)(FabStorehouseMaintenance);

