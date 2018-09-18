import * as types from './actionTypes.js';

import {message} from 'antd';

import axios from 'axios';

import {request,setUserName} from '../../../util/index.js';

import {ADMIN_LOGIN} from '../../../api/index.js';

export let loginSuccess=()=>{
	return {
		type:types.LOGIN_VALUE_RIGHT
	}
}
export let loginFailed=()=>{
	return {
		type:types.LOGIN_VALUE_WRONG
	}
}
export let getLogin=(payload)=>{
	return (dispatch)=> {
		request({
			method: 'post',
			url:ADMIN_LOGIN,
			data:payload
		})
		.then((result)=>{ 
			console.log(result) 
			//登录成功	
			if(result.data.code == 0){
				//储存用户信息
				setUserName(result.data.data.username);
				window.location.href = '/'
			}else if(result.data.code == 1){
				message.error(result.message)
			}
	      	const action=loginSuccess();
	      	dispatch(action);
		})
		.catch((e)=>{
			// console.log(e)
			message.error('网络错误,请稍后在试!');
      		const action=loginFailed();
	      	dispatch(action);	
		})
	}
}