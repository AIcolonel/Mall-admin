import React,{Component} from 'react';
import { Select } from 'antd';

import { GET_CATEGORY } from '../../api/index.js';
import { request } from '../../util/index.js';

const Option = Select.Option;
class SelectCategory extends Component{
	constructor(props){
		super(props);
		this.state={
			levelOneCategoryOption:[],
			levelOneCategoryId:'',
			levelTwoCategoryOption:[],
			levelTwoCategoryId:'',
			isChanged:false,
			isLoadLevelTwoCategory:false
		}
		// console.log()
		this.handleLevelOneChange=this.handleLevelOneChange.bind(this);
		this.handleLevelTwoChange=this.handleLevelTwoChange.bind(this);
	}

	componentDidMount(){
		this.loadLevelOneCategory();
	}

	static getDerivedStateFromProps(props, state){
		const levelOneCategoryIdChanged = props.parentId != state.levelOneCategoryId;
		const levelTwoCategoryIdChanged = props.childrenId != state.levelTwoCategoryId;

		//如果是新添加商品，则不用更新state数据
		if(state.levelOneCategoryId && !props.parentId && !props.childrenId){
			return null;
		}

		//如果分类ID没有改变，就说明不用更新state
		if(!levelOneCategoryIdChanged && !levelTwoCategoryIdChanged){
			return null;
		}
		if(state.isChanged){
			return null;
		}
		if(props.parentId == 0){
			return {
				levelOneCategoryId:props.childrenId,
				levelTwoCategoryId:'',
				isChanged:true
			}
		}else{
			return {
				levelOneCategoryId:props.parentId,
				levelTwoCategoryId:props.childrenId,
				isChanged:true,
				isLoadLevelTwoCategory:true
			}
		}
		return null;
	}

	componentDidUpdate(){
		if(this.state.isLoadLevelTwoCategory){
			this.loadLevelTwoCategory();
			this.setState({
				isLoadLevelTwoCategory:false
			})
		}
	}

	loadLevelOneCategory(){
		request({
			method:'get',
			url:GET_CATEGORY,
			data:{
				pid:0
			}
		})
		.then((result)=>{
			if(result.data.code == 0){
				this.setState({
					levelOneCategoryOption:result.data.data
				})
			}
		})
	}

	handleLevelOneChange(value){
		// console.log(value);
		this.setState({
			levelOneCategoryId:value,
			levelTwoCategoryOption:[],
			levelTwoCategoryId:''
		},()=>{
			this.loadLevelTwoCategory(this.state.levelOneCategoryId);
			this.onValueChange()
		})
	}

	loadLevelTwoCategory(){
		request({
			method:'get',
			url:GET_CATEGORY,
			data:{
				pid:this.state.levelOneCategoryId
			}
		})
		.then((result)=>{
			if(result.data.code == 0){
				this.setState({
					levelTwoCategoryOption:result.data.data
				})
			}
		})
	}

	handleLevelTwoChange(value){
		this.setState({
			levelTwoCategoryId:value
		},()=>{
			this.onValueChange()
		})
	}

	onValueChange(){
		const { levelOneCategoryId,levelTwoCategoryId } = this.state;
		if(levelTwoCategoryId){
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId);
		}else{
			this.props.getCategoryId(0,levelOneCategoryId);
		}
	}

	render(){
		const loadLevelOneCategoryOption=this.state.levelOneCategoryOption.map((levelOne)=><Option key={levelOne._id} value={levelOne._id}>{levelOne.name}</Option>);
		const loadLevelTwoCategoryOption=this.state.levelTwoCategoryOption.map((levelTwo)=><Option key={levelTwo._id} value={levelTwo._id}>{levelTwo.name}</Option>);
		return(
			<div>
		        <Select
		        disabled={this.props.disabled}
		        defaultValue={this.state.levelOneCategoryId}
		        value={this.state.levelOneCategoryId} 
		        style={{ width: 250,marginRight:20 }}
		        onChange={this.handleLevelOneChange}
		        >
		          	{loadLevelOneCategoryOption}
		        </Select>
		        <Select 
		        disabled={this.props.disabled}
		        defaultValue={this.state.levelTwoCategoryId}
		        value={this.state.levelTwoCategoryId}
		        onChange={this.handleLevelTwoChange}
		        style={{ width: 250 }}>
		          	{loadLevelTwoCategoryOption}
		        </Select>
		    </div>
		)
	}
}

export default SelectCategory;