import React from 'react';
import { connect } from 'dva';
import { Button, Icon } from 'antd';

function GlobalButtons({ dispatch, formCollapse, childrenNodes, collapseBtn }) {
  // 展开更多收缩条件
  const toggleSearchMoreInfo = () => {
    dispatch({ type: 'globalSearchForm/switchCollapse', payload: !formCollapse });
  };
  return (
    <span>
      {/* <Button type="primary" htmlType="submit">查询</Button> */}
      {/* {
        childrenNodes.map((child) => {
          return child;
        })
      } */}
      {/* <Button>重置</Button> */}
      {
        collapseBtn ? (<a
          onClick={toggleSearchMoreInfo}
          style={{ marginLeft: '10px' }}
        >
          展开<Icon type={formCollapse ? 'up' : 'down'} />
        </a>) : ''
      }

    </span>
  );
}

// class GlobalButtons extends React.Component {
//   // 展开更多收缩条件
//   state = { collapse: false }
//   switchCollapseHandle = () => {
//     this.setState({ collapse: !this.state.collapse });
//   };
//   // enterSearchMode = () => {
//   //   this.setState({ searchMode: true }, () => {
//   //     if (this.state.searchMode) {
//   //       this.input.focus();
//   //     }
//   //   });
//   // }

//   render() {
//     return (
//       <span className={styles.normal}>
//         <Button type="primary" htmlType="submit">查询</Button>
//         {/* <Button type="primary" style={{ marginLeft: '10px' }}>审核通过</Button>
//         <Button style={{ marginLeft: '10px' }}>审核驳回</Button>
//         <Button style={{ marginLeft: '10px' }}>批量下载</Button> */}
//         <Button style={{ marginLeft: '10px' }}>重置</Button>
//         <a
//           className={styles.cursor} onClick={this.switchCollapseHandle.bind(this)}
//           style={{ marginLeft: '10px' }}
//         >
//           展开<Icon type={this.state.collapse ? 'up' : 'down'} />
//         </a>
//       </span>
//     );
//   }
// }
const mapStateToProps = ({ globalSearchForm }) => {
  return globalSearchForm;
};
export default connect(mapStateToProps)(GlobalButtons);
