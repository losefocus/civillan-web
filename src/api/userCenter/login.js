import { post,get} from '../../axiosconfig/axiosConfig'
export default {
  login(params) {
    return post('/foreground/project_user/login', params)
  }
}

