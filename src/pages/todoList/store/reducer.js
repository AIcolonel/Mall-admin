import * as types from './actionTypes.js';
const { fromJS } = require('immutable')

const defaultState=fromJS({
	value:'hello',
	list:[111,222]
})

export default ((state=defaultState,action)=>{
	// console.log(state,action);
	//当以下条件满足时，就说明我要告诉store要改变属性和值等
	if(action.type==types.CHANGE_VALUE){
		/*
		const newState=JSON.parse(JSON.stringify(state));
		newState.value=action.payload;

		return newState;
		*/
		return state.set('value',action.payload);
	}

	if(action.type==types.ADD_ITEM){
		/*
		const newState=JSON.parse(JSON.stringify(state));
		newState.list.push(state.value);
		newState.value='';

		return newState;
		*/
		const newList=[...state.get('list'),state.get('value')];
		console.log(newList);
		return state.merge({
			value:'',
			list:newList
		})
	}

	if(action.type==types.DELETE_ITEM){
		/*
		const newState=JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1);

		return newState;
		*/
		const newList=[...state.get('list')];
		newList.splice(action.payload,1);
		return state.set('list',newList);
	}

	if(action.type==types.LOAD_DATA){
		/*
		const newState=JSON.parse(JSON.stringify(state));
		newState.list=action.payload

		return newState;
		*/
		return state.set('list',action.payload)
	}
	return state;
})