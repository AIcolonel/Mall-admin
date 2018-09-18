import * as types from './actionTypes.js';

import {message} from 'antd';

import axios from 'axios';

import {request,setUserName} from '../../../util/index.js';

import {GET_COUNT} from '../../../api/index.js';

export let loadCountData=(payload)=>{
	return {
		type:types.GET_COUNT_NUMBER,
		payload:payload
	}
}
export let getCountNumber=(payload)=>{
	return (dispatch)=> {
		request({
			url:GET_COUNT
		})
		.then((result)=>{ 
			// console.log(result)
			//登录成功	
			if(result.data.code == 0){
				const action =loadCountData(result.data.data);
				dispatch(action);
			}else if(result.data.code == 1){
				message.error('不能获取用户数据')
			}
		})
		.catch((e)=>{
			// console.log(e)
			message.error('网络错误,请稍后在试!');
		})
	}
}