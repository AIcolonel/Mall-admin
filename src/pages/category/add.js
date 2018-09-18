import React,{Component} from 'react';

import Layout from '../../common/layout/layout.js';
import { Breadcrumb,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {connect} from 'react-redux';

import * as types from './store/action.js';

const FormItem = Form.Item;
const Option = Select.Option;
class NormalCategoryAdd extends Component{
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	componentDidMount(){
		this.props.getLevelOneCategory();
	}
	handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      	this.props.handleAdd(values);
      }else{
      	console.log(err);
      }
  	});
  }
	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
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
	          offset: 8,
	        },
	      },
	    };
		return (
			<Layout>
				<div className="categorylist">
					<Breadcrumb>
					    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
					    <Breadcrumb.Item>新增分类</Breadcrumb.Item>
					</Breadcrumb>
					<Form>
						<FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入分类名称',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '请选择父类名称',
				            }],
				          })(
				            <Select initialValue={{ key: '0' }} style={{ width: 300 }}>
							    <Option value="0">根分类</Option>
							    {
							    	this.props.levelOneCategory.map((category)=>{
							    		return <Option key={category.get('_id')} value={category.get('_id')}>根分类/{category.get('name')}</Option>
							    	})
							    }
							</Select>
				          )}
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
const CategoryAdd=Form.create()(NormalCategoryAdd)


// 将父组件上的state映射到子组件上面
const mapStateToProps=(state)=>{
	// console.log(state);
	return {
		isAddFetching:state.get('category').get('isAddFetching'),
		levelOneCategory:state.get('category').get('levelOneCategory')
	}
}

//将父组件上面的方法映射到自子组件上面
const mapDispatchToProps=(dispatch)=>{
	return {
		handleAdd:(values)=>{
			const action=types.getAddCategory(values);
			dispatch(action);
		},
		getLevelOneCategory:()=>{
			const action=types.getLevelOneCategoryAction();
			dispatch(action);
		}  
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);