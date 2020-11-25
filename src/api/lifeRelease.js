/*
@name:时间戳
@author: ZhiYuanWang
@time: 2020-08-26 11:09:35
*/
import Axios from '../utils/request'
export  default {
    //关于列表
    getLife(){
        return Axios.get('/getTimeAxisList')
    },
    //删除
    delLife(val){
        return Axios.post('/delTimeAxis',{id:val})
    },
    //添加
    addLife(form){
        return Axios.post('/addTimeAxis',{name:form.name,content:form.content})
    }
};