import React,{Component} from 'react';
import {Table,Breadcrumb } from 'antd';
import moment from 'moment';
import {connect} from 'react-redux';

import Layout from '../../common/layout/layout.js';
//将action引入
import * as types from './store/action.js';

const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username'
}, {
  title: '是否是管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render:isAdmin=>( isAdmin ? '是' : '否')
},{
	title: '邮箱',
  dataIndex: 'email',
  key: 'email'
},{
	title: '注册时间',
  dataIndex: 'registerTime',
  key: 'registerTime'
}];

class User extends Component{
	constructor(props){
		super(props);
		this.state={
			isFetching:false
		};
	}
	componentDidMount(){
		this.props.handleUsers(1);
	}
	render(){
		const data=this.props.list.map((user)=>{
			return {
				key:user.get('_id'),
				username:user.get('username'),
				isAdmin:user.get('isAdmin'),
				email:user.get('email'),
				registerTime:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()
		return(
			<Layout>
				 <Breadcrumb>
			    <Breadcrumb.Item>用户列表</Breadcrumb.Item>
			    <Breadcrumb.Item>信息管理</Breadcrumb.Item>
			  </Breadcrumb>
				<Table 
		        dataSource={data}
		        columns={columns}
		        pagination={
		          {
		          	current:this.props.current,
		            pageSize:this.props.pageSize,
		            total:this.props.total
		          }
		        }
		        onChange={
		        	(pagination)=>{
		        		this.props.handleUsers(pagination.current);
		        	}
		        } 
		        />
			</Layout>
		)
	}
}

// 将父组件上的state映射到子组件上面
const mapStateToProps=(state)=>{
	// console.log(state);
	return {
		current:state.get('user').get('current'),
	    pageSize:state.get('user').get('pageSize'),
	    total:state.get('user').get('total'),
	    list:state.get('user').get('list')
	}
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		handleUsers:(page)=>{
			const action=types.getUser(page);
			dispatch(action);
		} 
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(User);