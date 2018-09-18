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
import './detail.css';

const FormItem = Form.Item;
const Option = Select.Option;
class NormalGoodsDetail extends Component{
	constructor(props){
		super(props);
		this.state={
			goodsId:this.props.match.params.goodsId
		}
	}

	componentDidMount(){
		if(this.state.goodsId){
			this.props.handleGoodsDetail(this.state.goodsId)
		}
	}

	render(){
		let imgBox='';
		if(this.props.image){
			imgBox=this.props.image.split(',').map((img,index)=>(
				<li key={index}>
					<img src={img} />
				</li>))
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
				<div className="goodsDetail">
					<Breadcrumb>
					    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
					    <Breadcrumb.Item>
					    	商品详情
					    </Breadcrumb.Item>
					</Breadcrumb>
					<Form style={{marginTop:30}}>
						<FormItem
				          {...formItemLayout}
				          label="商品名称"
				        >
				            <Input 
				          	disabled={true}
				          	defaultValue={this.props.editName}
				            />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				            <Input 
				            disabled={true}
				            defaultValue={this.props.editDescribe}
				            />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          required
				          label="商品所属分类"
				          validateStatus={this.props.goodsValidateStatus}
				          help={this.props.goodsHelp}
				        >
				        <SelectCategory 
				        disabled={true}
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
			            <InputNumber
			            disabled={true}
					    value={this.props.editPrice}
					    formatter={value => `${value}元`}
					    parser={value => value.replace('元', '')}
					    />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
			            <InputNumber
					    value={this.props.editNumber}
					    disabled={true}
					    formatter={value => `${value}件`}
					    parser={value => value.replace('件', '')}
					    />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				        >
			            <ul className="imgBox">
				            {imgBox}
			            </ul>
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
				        <div dangerouslySetInnerHTML={{__html:this.props.value}}></div>
				        </FormItem>
					</Form>
				</div>
			</Layout>
		)
	}
}
const GoodsDetail=Form.create()(NormalGoodsDetail)


// 将父组件上的state映射到子组件上面
const mapStateToProps=(state)=>{
	// console.log(state);
	return {
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
		handleGoodsDetail:(goodsId)=>{
			const action=types.getGoodsDetailAction(goodsId);
			dispatch(action);
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(GoodsDetail);