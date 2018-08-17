import { post , get} from '../../axiosconfig/axiosConfig'
export default {
  list(params) {
    return get('/foreground/device_work_config/list', params)
  },
  add(params) {
    return post('/foreground/device_work_config/add', params)
  },
  edit(params) {
    return post('/foreground/device_work_config/edit', params)
  },
  delete(params) {
    return post('/foreground/device_work_config/delete', params)
  }
}
