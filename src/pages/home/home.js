import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Card } from 'antd';

import Layout from '../../common/layout/layout.js';
import './home.css';

//将action引入
import * as types from './store/action.js';

class Home extends Component{
	componentDidMount(){
		this.props.handleCountNumber();
	}
	render(){
		return(
			<div className="Home">
				<Layout>
					<Card className="card" hoverable={true} title="用户量" extra={<a href="#">More</a>} style={{ width: 300 }}>
					    <p>{this.props.usernumber}</p>
					</Card>
					<Card className="card" hoverable={true} title="订单数" extra={<a href="#">More</a>} style={{ width: 300 }}>
					    <p>{this.props.countnumber}</p>
					</Card>
					<Card className="card" hoverable={true} title="商品数" extra={<a href="#">More</a>} style={{ width: 300 }}>
					    <p>{this.props.goodsnumber}</p>
					</Card>
				</Layout>
			</div>
		)
	}
}

// 将父组件上的state映射到子组件上面
const mapStateToProps=(state)=>{
	return {
		usernumber:state.get('home').get('usernumber'),
		countnumber:state.get('home').get('countnumber'),
		goodsnumber:state.get('home').get('goodsnumber')
	}
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		handleCountNumber:()=>{
			const action=types.getCountNumber();
			dispatch(action);
		} 
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);