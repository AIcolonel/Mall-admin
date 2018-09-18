import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import Layout from '../../common/layout/layout.js';
import { Switch,Breadcrumb,Button,Table,Divider,InputNumber,Modal,Input  } from 'antd';
//将action引入
import * as types from './store/action.js';



const Search = Input.Search;
class GoodsList extends Component{
	constructor(props){
		super(props);
		this.state={
			id:this.props.match.params.id || 0,
			visible: false
		}
	}
	componentDidMount(props){
		this.props.handleGoodsList(1);
	}
	componentDidUpdate(preProps,preState){
		
	}
	render(){
		const columns = [{
		  title: 'id',
		  dataIndex: 'id',
		  key: 'id'
		}, {
		  title: '商品名称',
		  dataIndex: 'name',
		  key: 'name',
		  render:(name)=>{
		  	if(this.props.keyword){
		  		let reg=new RegExp("("+this.props.keyword+")",'ig');
		  		let html=name.replace(reg,"<b style='color:red'>$1</b>");
		  		return <span dangerouslySetInnerHTML={{__html:html}}></span>;
		  	}else{
		  		return name;
		  	}
		  }
		},{
		  title: '状态',
		  dataIndex: 'status',
		  key: 'status',
		   render:(status,record)=>{
			  	return(
			  		<span>
			  			<Switch
			  				checkedChildren="在售" 
			  				unCheckedChildren="下架"
			  				defaultChecked={record.status == '0' ? true : false}
			  				onChange={(checked)=>{
			  					this.props.handleStatus(record.id, checked ? '0' : '1');
			  				}}
			  			 />
			  		</span>
			  	)
			 }
		},{
			title: '排序',
		  dataIndex: 'order',
		  key: 'order',
		  render: (order, record) => (
		   <InputNumber 
		   defaultValue={order} 
		   onBlur={(e)=>{ 
		   	this.props.handleOrder(record.id,e.target.value)}}
		   />
		  )
		},{
		  title: '操作',
		  key: 'action',
		  render: (text, record) => (
		    <span>
		   		<Link to={"/goods/detail/"+record.id}>查看</Link>
 				<Divider type="vertical" />
				<Link to={"/goods/save/"+record.id}>编辑</Link>
		    </span>
		  )}];
		const pid=this.state.pid || 0 ;
		const data=this.props.list.map((goodsList)=>{
			return {
				key:goodsList.get('_id'),
				id:goodsList.get('_id'),
				name:goodsList.get('name'),
				order:goodsList.get('order'),
				status:goodsList.get('status')
			}
		}).toJS()
		return (
			<Layout>
				<Breadcrumb>
				    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
				    <Breadcrumb.Item>商品信息</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{ marginTop:20,fontSize:16 }} className="clearfix">
					<Search
					style={{width:400,float:'left'}}
					placeholder="请输入搜索的关键词"
					onSearch={(value) =>{
						this.props.handleSearch(value,1)
					}}
					enterButton
					/>
					<Button style={{ float:'right' }} type="primary"><Link to='/goods/save'>新增分类</Link></Button>
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
		        			this.props.handleGoodsList(pagination.current);
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
		keyword:state.get('goods').get('keyword'),
		current:state.get('goods').get('current'),
	    pageSize:state.get('goods').get('pageSize'),
	    total:state.get('goods').get('total'),
	    list:state.get('goods').get('list'),
	    updateName:state.get('goods').get('updateName'),
	    visible:state.get('goods').get('visible'),
	}
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		handleGoodsList:(page)=>{
			const action=types.getGoodsList(page);
			dispatch(action);
		},
		handleOrder:(updateId,updateOrder)=>{
			console.log(updateId,updateOrder)
			const action=types.handleOrderAction(updateId,updateOrder);
			dispatch(action);
		},
		handleStatus:(checkedId,statusValue)=>{
			const action=types.handleStatusAction(checkedId,statusValue);
			dispatch(action);
		},
		handleSearch:(value,page)=>{
			const action=types.handleSearchAction(value,page);
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(GoodsList);