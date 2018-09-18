import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import Layout from '../../common/layout/layout.js';
import { Breadcrumb,Button,Table,Divider,InputNumber,Modal,Input  } from 'antd';
//将action引入
import * as types from './store/action.js';




class CategoryList extends Component{
	constructor(props){
		super(props);
		this.state={
			pid:this.props.match.params.pid || 0,
			visible: false
		}
	}
	componentDidMount(props){
		this.props.handleCategoryList(this.state.pid,1);
	}
	componentDidUpdate(preProps,preState){
		let oldPath=preProps.location.pathname;
		let newPath=this.props.location.pathname;
		if(oldPath != newPath){
			let newPid=this.props.match.params.pid || 0;
			this.setState({
				pid:newPid
			},()=>{
				this.props.handleCategoryList(newPid,1)
			})
		}
	}
	render(){
		const columns = [{
		  title: 'id',
		  dataIndex: 'id',
		  key: 'id'
		}, {
		  title: '分类名称',
		  dataIndex: 'name',
		  key: 'name'
		},{
			title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render: (order, record) => (
		   <InputNumber 
		   defaultValue={order} 
		   onBlur={(e)=>{this.props.handleOrder(pid,record.id,e.target.value)}}
		   />
		  )
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		   		<a
				href="javascript:;"
				onClick={()=>{this.props.updateVisible(record.id,record.name)}}
				>
		      	更新分类
		     	</a> 
		     	{
		     		record.pid==0
		     		?(
		     			<span>
		     				<Divider type="vertical" />
      						<Link to={"/category/"+record.id}>查看子分类</Link>
		     			</span>
		     		)
		     		: null
		     	}
		    </span>
		  )}];
		const pid=this.state.pid || 0 ;
		const data=this.props.list.map((categoryList)=>{
			return {
				key:categoryList.get('_id'),
				id:categoryList.get('_id'),
				name:categoryList.get('name'),
				order:categoryList.get('order'),
				pid:categoryList.get('pid')
			}
		}).toJS()
		return (
			<Layout>
				<Breadcrumb>
				    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
				    <Breadcrumb.Item>管理类型</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ marginTop:20,fontSize:16 }} className="clearfix">
					<p style={{ float:'left' }}>父类ID：{pid}</p>
					<Button style={{ float:'right' }} type="primary"><Link to='/category/add'>新增分类</Link></Button>
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
		        		this.props.handleCategoryList(this.state.pid,pagination.current);
		        	}
		        } 
		        />
		        <Modal
				title="更新信息"
				visible={this.props.visible}
				onOk={()=>{this.props.handleOk(pid,this.props.current)}}
				onCancel={this.props.handleCancel}
				>
					<Input
					value={this.props.updateName}
					onChange={(e)=>{this.props.handleValue(e.target.value)}}
					/>
				</Modal>
			</Layout>
		)
	}
}

// 将父组件上的state映射到子组件上面
const mapStateToProps=(state)=>{
	// console.log(state);
	return {
		current:state.get('category').get('current'),
	    pageSize:state.get('category').get('pageSize'),
	    total:state.get('category').get('total'),
	    list:state.get('category').get('list'),
	    updateName:state.get('category').get('updateName'),
	    visible:state.get('category').get('visible'),
	}
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		handleCategoryList:(pid,page)=>{
			const action=types.getCategoryList(pid,page);
			dispatch(action);
		},
		updateVisible:(updateID,updateName)=>{
			const action=types.showUpdateVisible(updateID,updateName);
			dispatch(action);
		},
		handleCancel:()=>{
			const action=types.handleCancelAction();
			dispatch(action);
		},
		handleValue:(value)=>{
			const action=types.handleValueAction(value);
			dispatch(action);
		},
		handleOk:(pid,page)=>{
			const action=types.handleOkAction(pid,page);
			dispatch(action);
		},
		handleOrder:(pid,updateId,updateOrder)=>{
			const action=types.handleOrderAction(pid,updateId,updateOrder);
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);