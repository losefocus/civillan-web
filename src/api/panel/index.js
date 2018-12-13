import { get } from '../../axiosconfig/axiosConfig'

export default {
  list(params) {
    return get('/foreground/screen/list_device',params)
  },
  count(params) {
    return get('/foreground/screen/list_count',params)
  }
}
