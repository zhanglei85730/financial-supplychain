import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Progress } from 'antd';
import GlobalSearchForm from '../../components/GlobalSearchForm/GlobalSearchForm.js';

class SearchForm extends React.Component {
  state = { modalvisible: false }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    /**
 * @description form提交处理回调方法
 * @type array
 * @param {JSON} fieldsValue form表单参数
 */
    const handleSubmit = (fieldsValue) => {
      const dateFormat = 'YYYY-MM-DD';
      const values = {
        ...fieldsValue,
        // 格式化期间日期格式
        period: fieldsValue.period ? (fieldsValue.period.format(dateFormat)) : '',
        // 格式化RankPicker返回格式
        date: fieldsValue.date ? [fieldsValue.date[0].format(dateFormat), fieldsValue.date[1].format(dateFormat)] : '',
      };
      console.log(values);
    };
// 2维数组，表示一行、行里的input
    const formItemsConfig = [
      [
        {
          label: '期间',
          type: 'period',
          id: 'period',
          formCol: { md: 5, sm: 24 },
        },
        {
          label: '账号',
          id: 'accounts',
          mode: 'multiple',
          type: 'select',
          formCol: { md: 4, sm: 24 },
          data: [
            { value: '1', text: '账号1' },
            { value: '2', text: '账号2' },
            { value: '3', text: '账号3' },
          ],
        },
        {
          id: 'department',
          // 同select属性,可以附加 select的属性
          mode: 'multiple',
          type: 'select',
          label: '部门',
          formCol: { md: 4, sm: 24 },
          // input数据
          data: [
            // 同select Option属性,可以附加 Option的属性
            { value: 'department1', text: '一部' },
            { value: 'department2', text: '二部' },
          ],
        },

        {
          label: '币别',
          id: 'currency',
          mode: 'multiple',
          type: 'select',
          formCol: { md: 4, sm: 24 },
          data: [
            { value: 'cny', text: '人民币' },
            { value: 'us', text: '美元' },
            { value: 'jp', text: '日元' },
          ],
        },
      ],

    ];
    /*  const collapseFormItemsConfig = [
       {
         label: '账单日期',
         id: 'date',
         type: 'rangePicker',
         formCol: { md: 5, sm: 24 },
       },
       {
         id: 'voucher',
         // 同select属性,可以附加 select的属性
         mode: 'multiple',
         type: 'select',
         label: '凭证状态',
         formCol: { md: 4, sm: 24 },
         // input数据
         data: [
           // 同select Option属性,可以附加 Option的属性
           { value: 'department1', text: '完成' },
           { value: 'department2', text: '未完成' },
         ],
       },
       {
         label: '凭证号',
         id: 'voucherNum',
         formCol: { md: 4, sm: 24 },
         type: 'text',
         placeholder: '输入凭证号',
       },
     ]; */

    return (
      <span>
        <GlobalSearchForm
          onSubmitHandle={handleSubmit}
          // 需要的input类型
          formItems={formItemsConfig}
          // 统一布局（如无个别列需要个别设置的情况）,会覆盖formCol的设置
          // autoCol={{ md: 4, sm: 24 }}
          // 按钮布局
          buttonsCol={{ md: 6, sm: 24 }}
          // 被收起的formItem
          // collapseFormItems={collapseFormItemsConfig}
          collapseBtn={false}
        >
          <Button>导出</Button>
          <Button onClick={this.showModal.bind(this)}>生成凭证</Button>
        </GlobalSearchForm>
        <Modal
          title="生成凭证"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Progress percent={50} status="active" />
          <p>推送到：780</p>
        </Modal>
      </span>
    );
  }
}
// const SearchFormWarp = Form.create()(SearchForm);
export default SearchForm;
