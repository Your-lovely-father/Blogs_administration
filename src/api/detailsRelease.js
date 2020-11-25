/*
@name:文章详情
@author: ZhiYuanWang
@time: 2020-08-26 11:09:35
*/
import Axios from '../utils/request'
export  default {
    //文章详情列表
    getDetails(id){
        return Axios.post('/getArticleDetail',{id:id})
    },
    //添加
    addDetails(form){
        return Axios.post('/addReplyArticle',{
			id:form.id,
			content:form.content,
			link:form.link,
			author:form.author,
			})
    }
};