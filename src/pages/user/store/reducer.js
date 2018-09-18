import * as types from './actionTypes.js';

import { fromJS } from 'immutable'

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	current:1,
    pageSize:10,
    total:400,
    list:[]
})

export default (state=defaultState,action)=>{
	//当以下条件满足时，就说明我要告诉store要改变属性和值等
	if(action.type==types.GET_USER){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    list:fromJS(action.payload.list)
		});
	}
	if(action.type==types.LOGIN_VALUE_RIGHT){
		return state.set('isFetching',true);
	}
	return state;
}