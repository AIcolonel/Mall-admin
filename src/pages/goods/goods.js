import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom'
import { Breadcrumb } from 'antd';

import GoodsSave from './save.js';
import GoodsList from './list.js';
import GoodsDetail from './detail.js';
class Goods extends Component{
	render(){
		return(
			<div className="category">
				<Switch>
					<Route path='/goods/save/:goodsId?' component={GoodsSave} />
					<Route path='/goods/detail/:goodsId?' component={GoodsDetail} />
					<Route path='/goods/:pid?' component={GoodsList} />
				</Switch>
			</div>
		)
	}
}

export default Goods;