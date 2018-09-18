import * as types from './actionTypes.js';

import { fromJS } from 'immutable'

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	usernumber:200,
	countnumber:201,
	goodsnumber:202
})

export default (state=defaultState,action)=>{
	//当以下条件满足时，就说明我要告诉store要改变属性和值等
	if(action.type==types.GET_COUNT_NUMBER){
		return state.merge({
			usernumber:action.payload.usernumber,
			countnumber:action.payload.countnumber,
			goodsnumber:action.payload.goodsnumber
		});
	}
	return state;
}