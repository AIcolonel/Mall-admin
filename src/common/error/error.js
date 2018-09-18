import React,{Component} from 'react';

import { Alert } from 'antd';

import './error.css';

class ErrorPage extends Component{
	render(){
		return(
			<div className="ErrorPage">
				<Alert message="加载页面出现错误，请检查请求或操作是否合理规范!!!" type="error" />
			</div>
		)
	}
}

export default ErrorPage;