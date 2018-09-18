import * as types from './actionTypes.js';

import { fromJS } from 'immutable'

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	//处理add
	isAddFetching:false,
	levelOneCategory:[],
	//处理list
	current:0,
    pageSize:0,
    total:0,
    list:[],
    updateID:'',
    updateName:'',
    visible:false
})

export default (state=defaultState,action)=>{
	//当以下条件满足时，就说明我要告诉store要改变属性和值等
	//处理add
	if(action.type==types.ADD_CATE){
		return state.set('isAddFetching',true);
	}
	if(action.type==types.GET_LEVEL_ONE_CATEGORY){
		return state.set('levelOneCategory',fromJS(action.payload));
	}

	// 处理list
	if(action.type==types.GET_CATEGORY_LIST){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    list:fromJS(action.payload.list)
		});
	}

	if(action.type==types.SHOW_UPDATE_VISIBLE){
		return state.merge({
			visible:true,
			updateID:action.payload.updateID,
			updateName:action.payload.updateName
		});
	}

	if(action.type==types.HANDLE_CANCEL){
		return state.set('visible',false)
	}

	if(action.type==types.HANDLE_VALUE){
		return state.set('updateName',action.payload)
	}

	//处理更新分类
	if(action.type==types.UPDATE_CATEGORY_SUCCESS){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    list:fromJS(action.payload.list)
		});
	}

	//处理更新排序
	if(action.type==types.UPDATE_CATEGORY_ORDER_SUCCESS){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    list:fromJS(action.payload.list)
		});
	}
	return state;
}