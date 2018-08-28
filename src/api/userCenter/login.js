import { post,get} from '../../axiosconfig/axiosConfig'
import qs from 'qs'

export default {
  login(params) {
    return post('/foreground/project_user/login', qs.stringify(params))
  }
}

