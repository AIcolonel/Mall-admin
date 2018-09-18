import * as types from './actionTypes.js';

import {message} from 'antd';

import axios from 'axios';

import {request,setUserName} from '../../../util/index.js';

import {SAVE_GOODS,GET_GOODS,UPDATE_GOODS_ORDER,EDIT_GOODS,UPDATE_GOODS_STATUS,SEARCH_GOODS} from '../../../api/index.js';

export const getCategoryAction=(parentId,childrenId)=>{
	return {
		type:types.SET_CATEGORY,
		payload:{
			parentId:parentId,
			childrenId:childrenId
		}
	}
}

export const getImageAction=(fileList)=>{
	return {
		type:types.SET_IMAGE,
		payload:fileList
	}
}

export const getDetailAction=(value)=>{
	return {
		type:types.SET_DETAIL,
		payload:value
	}
}



const AddGoodsAction=(doc)=>{
	return {
		type:types.ADD_GOODS,
		payload:doc
	}
}

//验证分类目录
const setGoodsError=()=>{
	return {
		type:types.SET_GOODS_ERROR
	}
}
//验证图片
const setImagesError=()=>{
	return {
		type:types.SET_IMAGES_ERROR
	}
}
export let getAddGoodsAction=(err,values)=>{
	return (dispatch,getState)=> {
		const state=getState().get('goods');
		let hasError=false;
		if(!state.get('childrenId')){
			dispatch(setGoodsError());
			hasError=true;
		}
		if(!state.get('image')){
			dispatch(setImagesError());
			hasError=true;
		}
		if(hasError){
			return;
		}
		if(err){
			return;
		}
		//新增处理
		let method='post';
		//编辑处理
		if(values.id){
			method='put';
		}
		request({
			method: method,
			url:SAVE_GOODS,
			data:{
				...values,
				sonId:state.get('childrenId'),
				image:state.get('image'),
				value:state.get('value')
			}
		})
		.then((result)=>{
			// console.log(result) 
			message.success('成功添加(编辑)商品');
			window.location.href = '/goods'			
		})
		.catch((e)=>{
			// console.log(e)
			message.error('网络错误,请稍后在试!');	
		})
	}
}



export let getGoodsSuccess=(payload)=>{
	return {
		type:types.GET_GOODS_LIST,
		payload:payload
	}
}
export let getGoodsList=(page)=>{
	return (dispatch)=> {
		request({
			method:'get',
			url:GET_GOODS,
			data:{
				page:page
			}
		})
		.then((result)=>{ 
			// console.log(result);
			if(result.data.code==0){
				dispatch(getGoodsSuccess(result.data.data));
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

export const updateGoodsOrderSuccess=(payload)=>{
	return {
		type:types.UPDATE_GOODS_ORDER_SUCCESS,
		payload:payload
	}
}
export const handleOrderAction=(updateId,updateOrder)=>{
	return (dispatch,getState)=> {
		const state=getState().get('goods');
		request({
			method:'put',
			url:UPDATE_GOODS_ORDER,
			data:{
				id:updateId,
				order:updateOrder,
				page:state.get('current')
			}
		})
		.then((result)=>{ 
			// console.log(result)
			if(result.data.code==0){
				dispatch(updateGoodsOrderSuccess(result.data.data));
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


export const updateGoodsStatusSuccess=(payload)=>{
	return {
		type:types.UPDATE_GOODS_STATUS_SUCCESS,
		payload:payload
	}
}
export const handleStatusAction=(checkedId,statusValue)=>{
	return (dispatch,getState)=> {
		const state=getState().get('goods');
		request({
			method:'put',
			url:UPDATE_GOODS_STATUS,
			data:{
				id:checkedId,
				status:statusValue,
				page:state.get('current')
			}
		})
		.then((result)=>{ 
			// console.log(result.data.data)
			if(result.data.code==0){
				message.success('更新商品状态成功');
			}else{
				message.error('更新失败,请检查操作是否正确!');
				dispatch(updateGoodsStatusSuccess(result.data.data));
			}
		})
		.catch((e)=>{
			console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
} 


export const editGoodsSuccess=(payload)=>{
	return {
		type:types.EDIT_GOODS_SUCCESS,
		payload:payload
	}
}
export const getEditGoodsAction=(goodsId)=>{
	return (dispatch,getState)=> {
		request({
			method:'get',
			url:EDIT_GOODS,
			data:{
				id:goodsId,
			}
		})
		.then((result)=>{ 
			console.log('getEditGoodsAction:::',result.data.data)

			if(result.data.code==0){
				dispatch(editGoodsSuccess(result.data.data));
			}else{
				message.error('编辑商品失败,请检查操作是否正确!');
			}

		})
		.catch((e)=>{
			console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}



export const searchGoodsSuccess=(payload)=>{
	return {
		type:types.SEARCH_GOODS_SUCCESS,
		payload:payload
	}
}
export const handleSearchAction=(value,page)=>{
	return (dispatch,getState)=> {
		request({
			method:'get',
			url:SEARCH_GOODS,
			data:{
				keyword:value,
				page:page
			}
		})
		.then((result)=>{ 
			console.log('handleSearchAction:::',result.data.data);
			if(result.data.code==0){
				dispatch(searchGoodsSuccess(result.data.data))
			}
		})
		.catch((e)=>{
			console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}


//查看商品详情信息
export const getGoodsDetailSuccess=(payload)=>{
	return {
		type:types.GET_GOODS_DETAIL_SUCCESS,
		payload:payload
	}
}
export const getGoodsDetailAction=(goodsId)=>{
	return (dispatch,getState)=> {
		request({
			method:'get',
			url:EDIT_GOODS,
			data:{
				id:goodsId,
			}
		})
		.then((result)=>{ 
			if(result.data.code==0){
				dispatch(getGoodsDetailSuccess(result.data.data));
			}else{
				message.error('编辑商品失败,请检查操作是否正确!');
			}

		})
		.catch((e)=>{
			console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}