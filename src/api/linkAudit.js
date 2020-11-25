/*
@name:友情链接
@author: ZhiYuanWang
@time: 2020-08-26 11:09:35
*/
import Axios from '../utils/request'
export  default {
    //友情列表
    getLink(){
        return Axios.get('/getLinkList')
    },
    //删除
    delList(val){
        return Axios.post('/delLink',{id:val})
    },
    //修改
    updList(_id,status){
        return Axios.post('/updateLink',{_id:_id,state:status})
    }
};