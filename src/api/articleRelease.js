/*
@name:文章发布
@author: ZhiYuanWang
@time: 2020-08-26 11:09:35
*/
import Axios from '../utils/request'
export  default {
    //文章列表
    getArticle(){
        return Axios.get('/getArticleList')
    },
    //删除
    delArticle(val){
        return Axios.post('/delArticle',{id:val})
    },
    //添加
    addArticle(form){
        return Axios.post('/addArticle',{
			title:form.title,
			tags:form.tags,
			desc:form.desc,
			top:form.top,
			img_url:form.img_url,
			origin:form.origin,
		})
    },
	//修改
	updArticle(data){
	    return Axios.post('/updateArticle',{id:data.id,top:data.top})
	}
};