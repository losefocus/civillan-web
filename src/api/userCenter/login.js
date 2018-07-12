import { post } from '../../axiosconfig/axiosConfig'
export default {
  login(params) {
    return post('/project_user/login', params)
  }
}
