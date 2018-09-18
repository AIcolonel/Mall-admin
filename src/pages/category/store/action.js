import * as types from './actionTypes.js';

import {message} from 'antd';

import axios from 'axios';

import {request,setUserName} from '../../../util/index.js';

import {ADD_CATEGORY,GET_CATEGORY,UPDATE_CATEGORY,UPDATE_ORDER} from '../../../api/index.js';

export let addRequest=()=>{
	return {
		type:types.ADD_CATE
	}
}
export let getLevelOneCategory=(payload)=>{
	return {
		type:types.GET_LEVEL_ONE_CATEGORY,
		payload:payload
	}
}

export let getAddCategory=(payload)=>{
	return (dispatch)=> {
		request({
			method: 'post',
			url:ADD_CATEGORY,
			data:payload
		})
		.then((result)=>{
			// console.log(result) 
			if(result.data.data){
				dispatch(getLevelOneCategory(result.data.data))
				message.success('添加一级分类成功');
				window.location.reload();
			}else{
				message.success('添加二级或多级分类成功');
			}
		})
		.catch((e)=>{
			// console.log(e)
			message.error('网络错误,请稍后在试!');	
		})
	}
}

export let getLevelOneCategoryAction=()=>{
	return (dispatch)=> {
		request({
			method: 'get',
			url:GET_CATEGORY,
			data:{
				pid:0
			}
		})
		.then((result)=>{ 
			// console.log(result)
			if(result.data.code==0){
				dispatch(getLevelOneCategory(result.data.data))
			}else{
				message.error('操作失败，请检查操作流程');
			}
		})
		.catch((e)=>{
			console.log(e)
			message.error('网络错误,请稍后在试!');	
		})
	}
}





export let getCateSuccess=(payload)=>{
	return {
		type:types.GET_CATEGORY_LIST,
		payload:payload
	}
}
export let getCategoryList=(pid,payload)=>{
	return (dispatch)=> {
		request({
			method:'get',
			url:GET_CATEGORY,
			data:{
				pid:pid,
				page:payload
			}
		})
		.then((result)=>{ 
			// console.log(result);
			if(result.data.code==0){
				dispatch(getCateSuccess(result.data.data));
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



export const showUpdateVisible=(updateID,updateName)=>{
	return {
		type:types.SHOW_UPDATE_VISIBLE,
		payload:{
			updateID:updateID,
			updateName:updateName
		}
	}
}


export const handleCancelAction=()=>{
	return {
		type:types.HANDLE_CANCEL
	}
}


export const handleValueAction=(value)=>{
	return {
		type:types.HANDLE_VALUE,
		payload:value
	}
}



export const updateCategorySuccess=(payload)=>{
	return {
		type:types.UPDATE_CATEGORY_SUCCESS,
		payload:payload
	}
}

export const handleOkAction=(pid,page)=>{
	return (dispatch,getState)=> {
		const state=getState().get('category');
		request({
			method:'put',
			url:UPDATE_CATEGORY,
			data:{
				id:state.get('updateID'),
				name:state.get('updateName'),
				pid:pid,
				page:page
			}
		})
		.then((result)=>{ 
			// console.log(result)
			if(result.data.code==0){
				dispatch(updateCategorySuccess(result.data.data));
				dispatch(handleCancelAction());
			}else{
				message.error('更新失败,请检查操作是否正确!');
			}
		})
		.catch((e)=>{
			// console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}




export const updateCategoryOrderSuccess=(payload)=>{
	return {
		type:types.UPDATE_CATEGORY_ORDER_SUCCESS,
		payload:payload
	}
}
export const handleOrderAction=(pid,updateId,updateOrder)=>{
	return (dispatch,getState)=> {
		const state=getState().get('category');
		request({
			method:'put',
			url:UPDATE_ORDER,
			data:{
				id:updateId,
				order:updateOrder,
				pid:pid,
				page:state.get('current')
			}
		})
		.then((result)=>{ 
			// console.log(result)
			if(result.data.code==0){
				dispatch(updateCategoryOrderSuccess(result.data.data));
			}else{
				message.error('更新失败,请检查操作是否正确!');
			}
		})
		.catch((e)=>{
			// console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}