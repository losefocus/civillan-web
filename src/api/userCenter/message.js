import { post } from '../../axiosconfig/axiosConfig'
import { get } from '../../axiosconfig/axiosConfig'
export default {
  emptyMessage(params) {
    return post('/notification/emptyMessage', params)
  },
  list(params) {
    return get('/notification/list',params)
  },
  signRead(params) {
    return post('/notification/signRead', params)
  },
  delete(params) {
    return post('/notification/signRead', params)
  }
}
