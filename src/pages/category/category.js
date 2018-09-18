import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom'
import { Breadcrumb } from 'antd';

import Layout from '../../common/layout/layout.js';
import CategoryList from './list.js';
import CategoryAdd from './add.js';


class Category extends Component{
	render(){
		return(
			<div className="category">
				<Switch>
					<Route path='/category/add' component={CategoryAdd} />
					<Route path='/category/:pid?' component={CategoryList} />
				</Switch>
			</div>
		)
	}
}

export default Category;