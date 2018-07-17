import { get } from '../../axiosconfig/axiosConfig'
export default {
  list(params) {
    return get('/foreground/device/list',params)
  }
}
