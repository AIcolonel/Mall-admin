import React,{Component} from 'react';

import {NavLink} from 'react-router-dom';
import './sider.css';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class MySider extends Component{
	render(){
		return(
			<div className="Sider">
				<Sider width={200} style={{ background: '#fff' }}>
			        <Menu
			          mode="inline"
			          defaultOpenKeys={['sub1']}
			          style={{ minHeight: 700, borderRight: 0 }}
			        >
			          <SubMenu key="sub1" title={<span><Icon type="user" />用户管理中心</span>}>
			            <Menu.Item key="1">
			            	<NavLink exact to='/'>
			            		<Icon type="home" />首页
			            	</NavLink>
			            </Menu.Item>
			            <Menu.Item key="2">
			            	<NavLink exact to='/user'>
			            		<Icon type="user" />用户列表
			            	</NavLink>
			            </Menu.Item>
			            <Menu.Item key="3">
			            	<NavLink exact to='/category'>
			            		<Icon type="menu-unfold" />分类管理
			            	</NavLink>
			            </Menu.Item>
			            <Menu.Item key="4">
			            	<NavLink exact to='/goods'>
			            		<Icon type="taobao-circle" />商品种类
			            	</NavLink>
			            </Menu.Item>
			            <Menu.Item key="5">
			            	<NavLink exact to='/order'>
			            		<Icon type="solution"/>订单列表
			            	</NavLink>
			            </Menu.Item>
			          </SubMenu>
			        </Menu>
			    </Sider>
			</div>
		)
	}
}

export default MySider;