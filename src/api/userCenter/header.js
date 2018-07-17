import { post } from '../../axiosconfig/axiosConfig'
import { get } from '../../axiosconfig/axiosConfig'
export default {
  login(params) {
    return post('/foreground/project_user/login', params)
  },
  userInfo(params) {
    return get('/foreground/project_user/get',params)
  }
}
