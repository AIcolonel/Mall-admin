import React from 'react';
import './app.css';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom'

import Login from './pages/login/login.js';
import Home from './pages/home/home.js';
import User from './pages/user/user.js';
import Category from './pages/category/category.js';
import Goods from './pages/goods/goods.js';
import Order from './pages/order/order.js';
import ErrorPage from './common/error/error.js';

import {getUserName} from './util/index.js';
//必须继承React.Component

class App extends React.Component{
	//必须有一个render方法
	render(){
		const LoginHomeRouter = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render = {props=>(
					getUserName()
					? <Component {...props} />
					: <Redirect to="/login" />
				)}
			/>
		)
		const LoginRouter = ({component:Component,...rest})=>{
			if(getUserName()){
				return <Redirect to="/" />
			}else{
				return <Route {...rest} component={Component} />
			}
		}
		return(
			<Router forceRefresh={true}>
				<div className="app">
					<Switch>
     					<LoginHomeRouter exact path="/" component={Home}/>
     					<LoginRouter path="/login" component={Login}/>
     					<Route path="/user" component={User}/>
     					<Route path="/category" component={Category}/>
     					<Route path="/goods" component={Goods}/>
     					<Route path="/order" component={Order}/>
     					<Route component={ErrorPage} />
					</Switch>
				</div>	
			</Router>
		)
	}
}



//导出组件 ==  module.exports = App
export default App;