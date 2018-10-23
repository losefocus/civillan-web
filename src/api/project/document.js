import { get } from '../../axiosconfig/axiosConfig'
import { post } from '../../axiosconfig/axiosConfig'
import qs from "qs";
export default {
  list(params) {
    return get('/foreground/project_file/list',params)
  },
  delete(params) {
    return post('/foreground/project_file/delete',qs.stringify(params))
  },
  add(params) {
    return post('/foreground/project_file/add',params)
  }

}
