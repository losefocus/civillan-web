import { post } from '../../axiosconfig/axiosConfig'
import { get } from '../../axiosconfig/axiosConfig'
export default {
  emptyMessage(params) {
    return post('/foreground/notification/emptyMessage', params)
  },
  list(params) {
    return get('/foreground/notification/list',params)
  },
  signRead(params) {
    return post('/foreground/notification/signRead', params)
  },
  delete(params) {
    return post('/foreground/notification/delete', params)
  }
}
