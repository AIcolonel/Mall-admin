import * as types from './actionTypes.js';

import { fromJS } from 'immutable';

//用fromJS包装一个immutable对象
const defaultState = fromJS({
	goodsValidateStatus:'',
	goodsHelp:'',
	imagesValidateStatus:'',
	imagesHelp:'',
	parentId:'',
	childrenId:'',
	image:'',
	value:'',
	current:0,
    pageSize:0,
    total:0,
    list:[],

    editName:'',
    editDescribe:'',
    eidtPrice:'',
    editNumber:'',
    keyword:'',

    orderDetail:''
})

export default (state=defaultState,action)=>{
	//当以下条件满足时，就说明我要告诉store要改变属性和值等
	
	// 处理list
	if(action.type==types.GET_ORDER_LIST){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    keyword:action.payload.keyword || '',
		    list:fromJS(action.payload.list)
		});
	}

	// 处理搜索商品信息
	if(action.type==types.SEARCH_ORDER_SUCCESS){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    keyword:action.payload.keyword || '',
		    list:fromJS(action.payload.list)
		});
	}

	//处理查看订单详情信息
	if(action.type==types.GET_ORDER_DETAIL_SUCCESS){
		return state.set("orderDetail",action.payload);
	}

	//处理发货
	if(action.type==types.GO_SET_ORDER_SUCCESS){
		return state.set("orderDetail",action.payload);
	}

	return state;
}