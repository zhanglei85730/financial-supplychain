import React from 'react';
import { connect } from 'dva';
import Proptypes from 'prop-types';
import SearchForm from './SearchForm.js';
import DataTable from './DataTable.js';
import styles from './style.less';

class OverpaidVAT extends React.Component {
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

OverpaidVAT.Proptypes = {
  queryParams: Proptypes.object,
};
function mapStateToProps({ overpaidVAT, common }) {
  const { queryParams } = common;
  return { ...overpaidVAT, queryParams };
}
export default connect(mapStateToProps)(OverpaidVAT);

