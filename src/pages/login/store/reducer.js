import * as types from './actionTypes.js';

import { fromJS } from 'immutable'

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	isFetching:false
})

export default (state=defaultState,action)=>{
	//当以下条件满足时，就说明我要告诉store要改变属性和值等
	if(action.type==types.LOGIN_VALUE_RIGHT){
		return state.set('isFetching',true);
	}
	if(action.type==types.LOGIN_VALUE_WRONG){
		return state.set('isFetching',false);
	}
	return state;
}