import axios from 'axios';
 
export const request=(options)=>{
	return new Promise((resolve,reject)=>{
		const params={
			method: options.method || 'get',
			url:options.url || 'http://localhost:8080',
			withCredentials:true
		}
		switch(params.method.toUpperCase()){
			case 'GET':
				params.params=options.data;
				break;
			default :
				params.data=options.data;
		}
		axios(params)
		.then((result)=>{
			let data=result.data
			if(data.code==10){
				// console.log(data);
				// 由于用户未登录，且通过非正规手段设置了cookies信息，因此需要清理掉cookies信息
				removeUserName();
				window.location.href = '/login';
				reject(data.message);
			}
			resolve(result);
		})
		.catch((err)=>{
			reject(err)
		})
	})
	
}

export const setUserName = (username)=>{
	window.localStorage.setItem('username',username)
}

export const getUserName = ()=>{
	return window.localStorage.getItem('username')
}

export const removeUserName = ()=>{
	window.localStorage.removeItem('username')
}