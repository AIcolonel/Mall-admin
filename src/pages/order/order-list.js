import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import Layout from '../../common/layout/layout.js';
import { Switch,Breadcrumb,Button,Table,Divider,InputNumber,Modal,Input  } from 'antd';
//将action引入
import * as types from './store/action.js';

import moment from 'moment';


const Search = Input.Search;
class OrderList extends Component{
	constructor(props){
		super(props);
		this.state={
			id:this.props.match.params.id || 0,
			visible: false
		}
	}
	componentDidMount(props){
		this.props.handleOrderList(1);
	}
	render(){
		const columns = [{
		  title: '订单号',
		  dataIndex: 'orderNo',
		  key: 'orderNo',
		  render:(orderNo)=>{
		  	if(this.props.keyword){
		  		let reg=new RegExp("("+this.props.keyword+")",'ig');
		  		let html=orderNo.replace(reg,"<b style='color:red'>$1</b>");
		  		return <span dangerouslySetInnerHTML={{__html:html}}></span>;
		  	}else{
		  		return orderNo;
		  	}
		  }
		}, {
		  title: '收件人',
		  dataIndex: 'username',
		  key: 'username',
		},{
		  title: '订单状态',
		  dataIndex: 'statusDesc',
		  key: 'statusDesc'
		},{
			title: '创建时间',
		  dataIndex: 'createdAt',
		  key: 'createdAt',
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		   		<Link to={"/order/detail/"+record.orderNo}>查看</Link>
		    </span>
		  )}];
		const data=this.props.list.map((orderList)=>{
			return {
				key:orderList.get('orderNo'),
				orderNo:orderList.get('orderNo'),
				username:orderList.get('shipping').get('username'),
				statusDesc:orderList.get('statusDesc'),
				createdAt:moment(orderList.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()
		return (
			<Layout>
				<Breadcrumb>
				    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
				    <Breadcrumb.Item>订单列表</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ marginTop:20,fontSize:16 }} className="clearfix">
					<Search
					style={{width:400,float:'left'}}
					placeholder="请输入搜索的订单号"
					onSearch={(value) =>{
						this.props.handleSearch(value,1)
					}}
					enterButton
					/>
				</div>
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
		        		if(this.props.keyword){
		        			this.props.handleSearch(this.props.keyword,pagination.current);
		        		}else{
		        			this.props.handleOrderList(pagination.current);
		        		}
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
		keyword:state.get('order').get('keyword'),
		current:state.get('order').get('current'),
	    pageSize:state.get('order').get('pageSize'),
	    total:state.get('order').get('total'),
	    list:state.get('order').get('list'),
	    updateName:state.get('order').get('updateName'),
	    visible:state.get('order').get('visible'),
	}
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		handleOrderList:(page)=>{
			const action=types.getOrderList(page);
			dispatch(action);
		},
		handleSearch:(value,page)=>{
			const action=types.handleSearchAction(value,page);
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderList);