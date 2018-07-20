import { get } from '../../axiosconfig/axiosConfig'
import { post } from '../../axiosconfig/axiosConfig'
export default {
  list(params) {
    return get('/foreground/project_file/list',params)
  }
}
