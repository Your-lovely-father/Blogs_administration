/*
@name:关于我
@author: ZhiYuanWang
@time: 2020-08-26 11:09:35
*/
import Axios from '../utils/request'
export  default {
    //关于列表
    getAbout(){
        return Axios.get('/getAboutMe')
    },
    //删除
    delAbout(val){
        return Axios.post('/delAboutMe',{id:val})
    },
    //添加
    addAbout(form){
        return Axios.post('/addAboutMe',{name:form.name,content:form.content})
    }
};