/*
@name: 登录接口
@author: ZhiYuanWang
@time: 2020-08-26 11:09:35
*/
import Axios from '../utils/request'
export  default {
    //登陆
    login(val){
        return Axios.post('/login',{email:val.email,password:val.password})
    },
};