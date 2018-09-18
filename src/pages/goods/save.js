import React,{Component} from 'react';

import { InputNumber,Breadcrumb,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {connect} from 'react-redux';
import * as types from './store/action.js';
import './goods.css';


import Layout from '../../common/layout/layout.js';
import SelectCategory from './selectCategory.js';
import UploadImg from '../../upload-image/upload.js';
import {UPLOAD_IMAGE,UPLOAD_DETAIL_IMAGE} from '../../api/index.js';
import RichSimditor from '../../common/rich-text/simditor.js';

const FormItem = Form.Item;
const Option = Select.Option;
class NormalGoodsSave extends Component{
	constructor(props){
		super(props);
		this.state={
			goodsId:this.props.match.params.goodsId
		}
		this.handleSubmit=this.handleSubmit.bind(this);
	}

	componentDidMount(){
		if(this.state.goodsId){
			this.props.handleEditGoods(this.state.goodsId)
		}
	}

	handleSubmit(e){
    	e.preventDefault();
    	this.props.form.validateFields((err, values) => {
      		// console.log(values);
      		values.id=this.state.goodsId;
      		this.props.handleAddGoods(err,values)
     	})
  	}

	render(){
		let fileList=[];
		if(this.props.image){
			fileList=this.props.image.split(',').map((img,index)=>({
				uid: index,
      			status: 'done',
      			url: img
			}))
		}
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 3 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 21 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 2,
	        },
	      },
	    };
		return (
			<Layout>
				<div className="goodssave">
					<Breadcrumb>
					    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
					    <Breadcrumb.Item>
					    	{
					    		this.state.goodsId
					    		? '编辑商品'
					    		: '添加商品'
					    	}
					    </Breadcrumb.Item>
					</Breadcrumb>
					<Form style={{marginTop:30}}>
						<FormItem
				          {...formItemLayout}
				          label="商品名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入商品名称',
				            }],
				            initialValue:this.props.editName
				          })(
				            <Input 
				            placeholder="商品名称"
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				          {getFieldDecorator('describe', {
				            rules: [{
				              required: true, message: '请输入商品描述',
				            }],
				            initialValue:this.props.editDescribe
				          })(
				            <Input placeholder="商品描述" />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          required
				          label="商品所属分类"
				          validateStatus={this.props.goodsValidateStatus}
				          help={this.props.goodsHelp}
				        >
				        <SelectCategory 
				        parentId={this.props.parentId}
				        childrenId={this.props.childrenId}
				        getCategoryId={(parentId,childrenId)=>{
				        	// console.log('parentId,sonId',parentId,sonId);
				        	this.props.handleCategory(parentId,childrenId)
				        }}
				        />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				          {getFieldDecorator('price', {
				            rules: [{
				              required: true, message: '请输入商品价格',
				            }],
				            initialValue:this.props.editPrice
				          })(
				            <InputNumber
						    initialValue={200}
						    min={0}
						    max={9999999}
						    formatter={value => `${value}元`}
						    parser={value => value.replace('元', '')}
						    />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('number', {
				            rules: [{
				              required: true, message: '请输入商品库存',
				            }],
				            initialValue:this.props.editNumber
				          })(
				            <InputNumber
						    initialValue={200}
						    min={0}
						    max={9999999}
						    formatter={value => `${value}件`}
						    parser={value => value.replace('件', '')}
						    />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				          required
				          validateStatus={this.props.imagesValidateStatus}
				          help={this.props.imagesHelp}
				        >
			            <UploadImg 
			            fileList={fileList}
			            action={UPLOAD_IMAGE}
			            getImageFile={
			            	(fileList)=>{
			            		// console.log('save::',fileList);
			            		this.props.handleImage(fileList)
			            	}
			            }
			            />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
				        <RichSimditor 
				        detail={this.props.value}
				        action={UPLOAD_DETAIL_IMAGE}
				        getTextContent={(value)=>{
				        	this.props.handleDetail(value)
				        }}
				        />
				        </FormItem>
				        <FormItem {...tailFormItemLayout}>
				          <Button
				          type="primary" 
				          onClick={this.handleSubmit}
				          loading={this.props.isAddFetching}
				          >
				          提交
				          </Button>
				        </FormItem>
					</Form>
				</div>
			</Layout>
		)
	}
}
const GoodsSave=Form.create()(NormalGoodsSave)


// 将父组件上的state映射到子组件上面
const mapStateToProps=(state)=>{
	// console.log(state);
	return {
		goodsValidateStatus:state.get('goods').get('goodsValidateStatus'),
		goodsHelp:state.get('goods').get('goodsHelp'),
		imagesValidateStatus:state.get('goods').get('imagesValidateStatus'),
		imagesHelp:state.get('goods').get('imagesHelp'),
		parentId:state.get('goods').get('parentId'),
		childrenId:state.get('goods').get('childrenId'),
		image:state.get('goods').get('image'),
		value:state.get('goods').get('value'),
		editName:state.get('goods').get('editName'),
	    editDescribe:state.get('goods').get('editDescribe'),
	    editPrice:state.get('goods').get('editPrice'),
	    editNumber:state.get('goods').get('editNumber')
	}
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		handleCategory:(parentId,childrenId)=>{
			// console.log('parentId,sonId',parentId,sonId);
			const action=types.getCategoryAction(parentId,childrenId);
			dispatch(action);
		},
		handleImage:(fileList)=>{
			const action=types.getImageAction(fileList);
			dispatch(action);
		},
		handleDetail:(value)=>{
			const action=types.getDetailAction(value);
			dispatch(action);
		},
		handleAddGoods:(err,values)=>{
			const action=types.getAddGoodsAction(err,values);
			dispatch(action);
		},
		handleEditGoods:(goodsId)=>{
			const action=types.getEditGoodsAction(goodsId);
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(GoodsSave);