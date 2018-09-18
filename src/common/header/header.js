import React,{Component} from 'react';

import { request,getUserName,removeUserName } from '../../util/index.js';
import {ADMIN_LOGOUT} from '../../api/index.js';
import './header.css';

import { Layout, Menu, Breadcrumb, Icon ,Dropdown } from 'antd';
const { Header, Content, Sider } = Layout;

class MyHeader extends Component{
	constructor(props){
		super(props);
		this.handleLogout=this.handleLogout.bind(this);
	}
	handleLogout(){
		request({
			method:'get',
			url:ADMIN_LOGOUT
		})
		.then((result)=>{
			removeUserName();
			window.location.href='/';
		})
	}
	render(){
		const menu = (
		  <Menu>
		    <Menu.Item key="0">
		      <a href="javascript:;" onClick={this.handleLogout} ><Icon type="logout" />退出系统</a>
		    </Menu.Item>
		  </Menu>
		);
		return(
			<div className="Header">
				<Header className="header">
		      	<div className="logo">KAMLL</div>
		      	<div className="dropdown">
			      	<Dropdown overlay={menu} trigger={['click']}>
					    <a className="ant-dropdown-link" href="#">
					       {getUserName()}<Icon type="down" />
					    </a>
					</Dropdown>
				</div>
		    	</Header>
		    </div>
		)
	}
}

export default MyHeader;