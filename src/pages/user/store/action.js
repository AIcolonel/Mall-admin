import * as types from './actionTypes.js';

import {message} from 'antd';

import axios from 'axios';

import {request,setUserName} from '../../../util/index.js';

import {GET_USERS} from '../../../api/index.js';

export let getUserSuccess=(payload)=>{
	return {
		type:types.GET_USER,
		payload:payload
	}
}
export let getUser=(payload)=>{
	return (dispatch)=> {
		request({
			method:'get',
			url:GET_USERS,
			data:{
				page:payload
			}
		})
		.then((result)=>{ 
			// console.log(result);
			if(result.data.code==0){
				dispatch(getUserSuccess(result.data.data));
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