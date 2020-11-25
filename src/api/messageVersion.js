/*
@name:留言板
@author: ZhiYuanWang
@time: 2020-08-26 11:09:35
*/
import Axios from '../utils/request'
export  default {
    //留言列表
    getLink(){
        return Axios.get('/getMessageList')
    },
    //删除
    delList(val){
        return Axios.post('/delMessage',{id:val})
    },
	//详情
	detailsList(val){
	    return Axios.post('/getMessageDetail',{id:val})
	},
	//回复留言
	addReply(val){
	    return Axios.post('/addReplyMessage',{ 
		_id:val.id,
		state:val.state,
		name:val.name,
		avatar:val.avatar,
		cname:val.cname,
		replyTime:val.create_Time,
		content:val.content
		})
	},
};