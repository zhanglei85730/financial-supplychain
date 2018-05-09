import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import style from './index.css';

const FormItem = Form.Item;

function Login({ dispatch, form }) {
  const { getFieldDecorator } = form;
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({ type: 'login/loginRequest', payload: values });
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit} className={style.loginForm}>
      <h1 className={style.loginTitle}><Icon type="team" /> 登 录</h1>
      <FormItem>
        {getFieldDecorator('userName', {
          rules: [{ required: true, message: '请输入用户名' }],
        })(
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码' }],
        })(
          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>记住密码</Checkbox>
          )}
        <a className={style.loginFormForgot} href="">忘记密码</a>
        <Button type="primary" htmlType="submit" className={style.loginFormButton}>
          登 录
          </Button>
        无账号？ <a href="">马上注册!</a>
      </FormItem>
    </Form>
  );
}

Login.propTypes = {

};
function mapStateToProps({ login }) {
  // 返回在键值就是组件接受的属性值
  return login;
}

const WrappedLogin = Form.create()(Login);
export default connect(mapStateToProps)(WrappedLogin);
