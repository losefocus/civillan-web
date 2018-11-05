import { get } from '../../axiosconfig/axiosConfig'

export default {
  list(params) {
    return get('/foreground/project_work_config/get',params)
  }
}
