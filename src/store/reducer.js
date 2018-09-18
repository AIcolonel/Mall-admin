import { combineReducers } from 'redux-immutable';

import loginReducer from '../pages/login/store/reducer.js';
import homeReducer from '../pages/home/store/reducer.js';
import userReducer from '../pages/user/store/reducer.js';
import categoryReducer from '../pages/category/store/reducer.js';
import goodsReducer from '../pages/goods/store/reducer.js';
import orderReducer from '../pages/order/store/reducer.js';

// console.log(todolistReducer)

export default combineReducers({
	login:loginReducer,
	home:homeReducer,
	user:userReducer,
	category:categoryReducer,
	goods:goodsReducer,
	order:orderReducer
})
	