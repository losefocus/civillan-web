import { post , get} from '../../axiosconfig/axiosConfig'
import qs from "qs";
export default {
  list(params) {
    return get('/foreground/project_work_config/list', params)
  },
  add(params) {
    return post('/foreground/project_work_config/add', params)
  },
  edit(params) {
    return post('/foreground/project_work_config/edit', params)
  },
  delete(params) {
    return post('/foreground/project_work_config/delete', qs.stringify(params))
  }
}
