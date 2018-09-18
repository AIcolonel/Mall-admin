import React,{Component} from 'react';

import { InputNumber,Breadcrumb,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {connect} from 'react-redux';
import * as types from './store/action.js';


import Layout from '../../common/layout/layout.js';
import {} from '../../api/index.js';
import moment from 'moment';
import './order-detail.css'

const FormItem = Form.Item;
const Option = Select.Option;
class NormalOrderDetail extends Component{
	constructor(props){
		super(props);
		this.state={
			orderNo:this.props.match.params.orderNo
		}
	}

	componentDidMount(){
		if(this.state.orderNo){
			this.props.handleOrderDetail(this.state.orderNo)
		}
	}

	render(){
		console.log('111',this.props.orderDetail);
		const {
			orderNo,
			statusDesc,
			payment,
			productList,
			shipping,
			status,
			createdAt
		}=this.props.orderDetail
		let createdTime=moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
		console.log('222',productList)
		return (
			<Layout>
				<div className="orderDetail">
					<Breadcrumb>
					    <Breadcrumb.Item>订单管理</Breadcrumb.Item>
					    <Breadcrumb.Item>
					    	订单详情
					    </Breadcrumb.Item>
					</Breadcrumb>
					{
						orderNo
						? 
							<div className="pannel">
								<div className="pannel-title">
									<h2>订单详情</h2>
									<ul>
										<li>
											<span className="order-no">订单号：{orderNo}</span>
										</li>
										<li>
											<span className="order-status">支付状态：{statusDesc}</span>
										</li>
										<li>
											<span className="order-status">收件人：{shipping.username}(电话：{shipping.userphone})</span>
										</li>
										<li>
											<span className="order-status">详细地址：{shipping.province} {shipping.city} {shipping.address}</span>
										</li>
										<li>
											<span className="order-time">创建时间：{createdTime}</span>
										</li>
										<li>
											<span className="order-payment">总金额：{payment}</span>
										</li>
										<li className="order-operation">
											<span className="off-order">取消订单</span>
											<span className="pay-order"><a href="/payment.html?orderNo={{orderNo}}">去支付</a></span>
										</li>
									</ul>
								</div>
								<ul className="cart-title clearfix">
									<li className="product-info">
										商品
									</li>
									<li className="product-price">
										单价
									</li>
									<li className="product-count">
										数量
									</li>
									<li className="product-totalPrice">
										小计
									</li>
								</ul>
								<div className="order-main">
									{

										productList.map((product,index)=>{
											return(
											<ul className="cart-item" data-product-id="{{product._id}}" key={index}>
												<li className="product-info">
													<a href="" className="link">
														<img src="http://localhost:3002/resource/default1.jpg" alt="" />
														<span>{product.name}</span>
													</a>
												</li>
												<li className="product-price">
													￥{product.price}
												</li>
												<li className="product-count">
													{product.count}
												</li>
												<li className="product-totalPrice">
													￥{product.totalPrice}
												</li>
											</ul>
											)
										})
									}
								</div>
							</div>
						: null 
					}
					
				</div>
			</Layout>
		)
	}
}
const OrderDetail=Form.create()(NormalOrderDetail)


// 将父组件上的state映射到子组件上面
const mapStateToProps=(state)=>{
	// console.log(state);
	return {
		orderDetail:state.get('order').get('orderDetail')
	}
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		handleOrderDetail:(orderNo)=>{
			const action=types.getOrderDetailAction(orderNo);
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail);