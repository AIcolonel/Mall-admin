import * as types from './actionTypes.js';
import axios from 'axios';

export let changeValueAction=(payload)=>{
	return {
		type:types.CHANGE_VALUE,
		payload:payload
	}
}

export let addItemAction=()=>{
	return {
		type:types.ADD_ITEM
	}
}

export let deleteItemAction=(payload)=>{
	return {
		type:types.DELETE_ITEM,
		payload:payload
	}
}

export let loadDataAction=(payload)=>{
	return {
		type:types.LOAD_DATA,
		payload:payload
	}
}

export let getDataAction=(payload)=>{
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:3000/api/getData')
		.then((data)=>{
			// console.log(data);
			const action=loadDataAction(data.data);
			dispatch(action);//这种方法来自于action.js中store.dispatch(action)传递数据时内部机制将dispatch传给我们需要返回的函数;
			// store.dispatch(action),这种方法是将store引入进来，直接调用store上面的dispatch方法
		})
		.catch(e=>{
			console.log(e);
		})
	}
}