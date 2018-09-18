import * as types from './actionTypes.js';

import { fromJS } from 'immutable'

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
    keyword:''
})

export default (state=defaultState,action)=>{
	//当以下条件满足时，就说明我要告诉store要改变属性和值等
	if(action.type==types.SET_CATEGORY){
		return state.merge({
			parentId:action.payload.parentId,
			childrenId:action.payload.childrenId,
			goodsValidateStatus:'',
			goodsHelp:'',
		});
	}

	if(action.type==types.SET_IMAGE){
		return state.merge({
			'image':action.payload,
			//成功上传图片后则需要将警告信息置空
			imagesValidateStatus:'',
			imagesHelp:'',
		});
	}

	if(action.type==types.SET_DETAIL){
		return state.set('value',action.payload);
	}

	if(action.type==types.SET_GOODS_ERROR){
		return state.merge({
			goodsValidateStatus:'error',
			goodsHelp:'请选择商品所属分类',
		});
	}

	//处理图片
	if(action.type==types.SET_IMAGES_ERROR){
		return state.merge({
			imagesValidateStatus:'error',
			imagesHelp:'请至少上传一张图片',
		});
	}

	// 处理list
	if(action.type==types.GET_GOODS_LIST){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    keyword:action.payload.keyword || '',
		    list:fromJS(action.payload.list)
		});
	}

	// 处理搜索商品信息
	if(action.type==types.SEARCH_GOODS_SUCCESS){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    keyword:action.payload.keyword || '',
		    list:fromJS(action.payload.list)
		});
	}

	//处理更新排序
	if(action.type==types.UPDATE_GOODS_ORDER_SUCCESS){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    list:fromJS(action.payload.list)
		});
	}

	//处理更新商品状态
	if(action.type==types.UPDATE_GOODS_STATUS_SUCCESS){
		return state.merge({
			current:action.payload.current,
		    pageSize:action.payload.pageSize,
		    total:action.payload.total,
		    list:fromJS(action.payload.list)
		});
	}

	//处理编辑商品信息
	if(action.type==types.EDIT_GOODS_SUCCESS){
		return state.merge({
			parentId:action.payload.sonId.pid,
			childrenId:action.payload.sonId._id,
			image:action.payload.image,
			value:action.payload.value,
			editName:action.payload.name,
		    editDescribe:action.payload.describe,
		    editPrice:action.payload.price,
		    editNumber:action.payload.number
		});
	}

	//处理产看商品详情信息
	if(action.type==types.GET_GOODS_DETAIL_SUCCESS){
		return state.merge({
			parentId:action.payload.sonId.pid,
			childrenId:action.payload.sonId._id,
			image:action.payload.image,
			value:action.payload.value,
			editName:action.payload.name,
		    editDescribe:action.payload.describe,
		    editPrice:action.payload.price,
		    editNumber:action.payload.number
		});
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

	
	return state;
}