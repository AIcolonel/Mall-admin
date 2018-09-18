import React,{Component} from 'react';

import { Form, Icon, Input, Button, Checkbox, message} from 'antd';

import axios from 'axios';

import {connect} from 'react-redux';
//将action引入
import * as types from './store/action.js';

const FormItem = Form.Item;
 
import './login.css';

class NormalLoginForm extends React.Component {
	constructor(props){
		super(props);
		this.state={
			isFetching:false
		};
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	this.props.handleInit(values)
        
      }else{
      	console.log(err);
      }
  	});
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="login">
	      <Form className="login-form">
	        <FormItem>
	          {getFieldDecorator('username', {
	            rules: [{ required: true, message: '请输入用户名!' },{pattern:/^[a-z|\d]{3,6}$/,message:'用户名为3-8个字符'}],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: '请输入密码!' },{pattern:/^[a-z|\d]{3,6}$/,message:'密码为3-8个字符'}],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
	          )}
	        </FormItem>
	        <FormItem>
	          <Button
		          type="primary"
		          onClick={this.handleSubmit}
		          className="login-form-button"
		          loading={this.props.isFetching}
		          >
	            登录
	          </Button>
	        </FormItem>
	      </Form>
	    </div>
    );
  }
}
const Login=Form.create()(NormalLoginForm)

// 将父组件上的state映射到子组件上面
const mapStateToProps=(state)=>{
	// console.log(state);
	return {
		isAddFetching:state.get('login').get('isAddFetching')
	}
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		handleInit:(values)=>{
			const action=types.getLogin(values);
			dispatch(action);
		} 
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);