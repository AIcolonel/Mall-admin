import { createStore,applyMiddleware  } from 'redux';
import reducer from './reducer.js';
import thunk from 'redux-thunk';

//这个中间件主要是为了方便开发人员调试数据
import { createLogger } from 'redux-logger';

const middleware=[thunk];

if(process.env.NODE_ENV=='development'){
	const logger = createLogger({
		// ...options
	});
	middleware.push(logger);
}


const store=createStore(reducer,applyMiddleware(...middleware))

export default store;