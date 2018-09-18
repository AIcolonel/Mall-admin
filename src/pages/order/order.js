import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom'
import { Breadcrumb } from 'antd';

import OrderList from './order-list.js';
import OrderDetail from './order-detail.js';
class Order extends Component{
	render(){
		return(
			<div className="order">
				<Switch>
					<Route path='/order/detail/:orderNo?' component={OrderDetail} />
					<Route path='/order' component={OrderList} />
				</Switch>
			</div>
		)
	}
}

export default Order;