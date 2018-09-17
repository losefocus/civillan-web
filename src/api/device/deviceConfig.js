import { get } from '../../axiosconfig/axiosConfig'

export default {
  list(params) {
    return get('/device_work_config/list',params)
  }
}
