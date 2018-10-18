import { post } from '../../axiosconfig/axiosConfig'
import { get } from '../../axiosconfig/axiosConfig'
import qs from 'qs'
export default {
  emptyMessage(params) {  //清空消息
    return post('/foreground/notification/emptyMessage', params)
  },
  list(params) { //消息列表
    return get('/foreground/notification/list',params)
  },
  signRead(params) { //标记已读
    return post('/foreground/notification/signRead', params)
  },
  signAllRead(params) { //标记全部已读
    return post('/foreground/notification/sign_all_read', params)
  },
  delete(params) {  //删除消息
    return post('/foreground/notification/delete', params)
  },
  unReadCount(params) {  //未读消息数量
    return get('/foreground/notification/get_not_read_count', params)
  }
}
