import React from 'react';
import './todolist.css';
import {Input,Row,Col,List,Button} from 'antd';
import {connect} from 'react-redux';
import * as types from './store/action.js';

//必须继承React.Component
class TodoList extends React.Component{
	componentDidMount(){
		// this.props.getDataItem();
	}
	//必须有一个render方法
	render(){
		return(
			<div className="todolist">
				<Row>
			      	<Col span={18} >
			      		<Input 
			      		value={this.props.value}
			      		onChange={this.props.valChange}
			      		/> 
			      	</Col>
			      	<Col span={6} >
			      		<Button
			      		type="primary"
			      		onClick={this.props.addItem}
			      		>
			      			增加
			      		</Button>
			      	</Col>
			    </Row>
			    <List
			      style={{ marginTop: 10 ,width:360}}
			      bordered
			      dataSource={this.props.list}
			      renderItem={(item,index) => (<List.Item onClick={()=>{this.props.deleteItem(index)}}>{item}</List.Item>)}
			    />	
			</div>
		)
	}
}

// 将父组件上的state映射到子组件上面
const mapStateToProps=(state)=>{
	console.log(state);
	
	return {
		value:state.get('todolist').get('value'),
		list:state.get('todolist').get('list')
	}
	
	// console.log(state);
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		valChange:(e)=>{
			const action=types.changeValueAction(e.target.value);
			dispatch(action)
		},
		addItem:()=>{
			const action=types.addItemAction();
			dispatch(action)
		},
		deleteItem:(index)=>{
			const action=types.deleteItemAction(index);
			dispatch(action)
		},
		getDataItem:()=>{
			const action=types.getDataAction();
			dispatch(action);
		}
	}
}

//导出组件 ==  module.exports = App
export default connect(mapStateToProps,mapDispatchToProps)(TodoList);