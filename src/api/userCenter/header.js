import { post } from '../../axiosconfig/axiosConfig'
import { get } from '../../axiosconfig/axiosConfig'
export default {
  login(params) {
    return post('/project_user/login', params)
  },
  userInfo(params) {
    return get('/project_user/get',params)
  }
}
