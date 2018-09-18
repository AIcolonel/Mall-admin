import * as types from './actionTypes.js';

import {message} from 'antd';

import axios from 'axios';

import { request,setUserName } from '../../../util/index.js';

import { GET_ORDER,SEARCH_ORDER,GET_ORDER_DETAIL,GO_SET_ORDER } from '../../../api/index.js';

export let getOrderSuccess=(payload)=>{
	return {
		type:types.GET_ORDER_LIST,
		payload:payload
	}
}
export let getOrderList=(page)=>{
	return (dispatch)=> {
		request({
			method:'get',
			url:GET_ORDER,
			data:{
				page:page
			}
		})
		.then((result)=>{ 
			// console.log(result);
			if(result.data.code==0){
				dispatch(getOrderSuccess(result.data.data));
			}else{
				message.error('获取数据失败,请检查操作是否正确!');
			}
		})
		.catch((e)=>{
			// console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}

//搜索商品
export const searchOrderSuccess=(payload)=>{
	return {
		type:types.SEARCH_ORDER_SUCCESS,
		payload:payload
	}
}
export const handleSearchAction=(value,page)=>{
	return (dispatch,getState)=> {
		request({
			method:'get',
			url:SEARCH_ORDER,
			data:{
				keyword:value,
				page:page
			}
		})
		.then((result)=>{ 
			// console.log('handleSearchAction:::',result.data.data);
			if(result.data.code==0){
				dispatch(searchOrderSuccess(result.data.data))
			}
		})
		.catch((e)=>{
			console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}

//查看订单详情信息
export const getOrderDetailSuccess=(payload)=>{
	return {
		type:types.GET_ORDER_DETAIL_SUCCESS,
		payload:payload
	}
}
export const getOrderDetailAction=(orderNo)=>{
	return (dispatch,getState)=> {
		request({
			method:'get',
			url:GET_ORDER_DETAIL,
			data:{
				orderNo:orderNo,
			}
		})
		.then((result)=>{ 
			if(result.data.code==0){
				// console.log("result.data.data",result.data.data);
				dispatch(getOrderDetailSuccess(result.data.data));
			}else{
				message.error('查看订单详情失败,请检查操作是否正确!');
			}

		})
		.catch((e)=>{
			console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}

//发货
export const goSetOrderSuccess=(payload)=>{
	return {
		type:types.GO_SET_ORDER_SUCCESS,
		payload:payload
	}
}
export const goSetOrderAction=(orderNo)=>{
	return (dispatch,getState)=> {
		request({
			method:'put',
			url:GO_SET_ORDER,
			data:{
				orderNo:orderNo,
			}
		})
		.then((result)=>{ 
			if(result.data.code==0){
				// console.log("result.data.data",result.data);
				dispatch(goSetOrderSuccess(result.data.data));
			}else{
				message.error('发货失败,请检查操作是否正确!');
			}

		})
		.catch((e)=>{
			console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}