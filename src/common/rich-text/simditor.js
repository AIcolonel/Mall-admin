import React,{Component} from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.css';
import $ from 'jquery';

class RichSimditor extends Component{
	constructor(props){
		super(props);
		this.state={
			notLoaded:true
		}
		this.toolbar=[
			'title',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'fontScale',
			'color',
			'ol' ,            
			'ul' ,           
			'blockquote',
			'code' ,          
			'table',
			'link',
			'image',
			'hr',             
			'indent',
			'outdent',
			'alignment'
		];
		$.ajaxSetup({
			xhrFields:{
				withCredentials:true
			}
		})

	}
	componentDidMount(){
		this.editor=new Simditor({
			textarea:this.textarea,
			toolbar:this.toolbar,
			upload:{
				url: this.props.action,
    			params: null,
    			fileKey: 'upload_file'
			}
		})
		this.editor.on('valuechanged',()=>{
			// console.log(this.editor.getValue());
			this.props.getTextContent(this.editor.getValue())
		})
	}
	componentDidUpdate(){
		if(this.props.detail && this.state.notLoaded){
			this.editor.setValue(this.props.detail);
			this.setState({
				notLoaded:false
			})
		}
	}
	render(){
		return(
			<div>
				<textarea ref={(textarea)=>{this.textarea=textarea}} ></textarea>
			</div>
		)	
	}
}

export default RichSimditor;