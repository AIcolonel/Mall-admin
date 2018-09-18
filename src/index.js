//用React的语法解析文件
import React from 'react'; // const React = require('react')
import {Provider} from 'react-redux';
import store from './store/index.js';


//ReactDOM就是用来把组件挂载到DOM节点上
import ReactDOM from 'react-dom';

import App from './app.js';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'))
