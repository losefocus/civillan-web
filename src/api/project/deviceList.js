import { get } from '../../axiosconfig/axiosConfig'
export default {
  list(params) {
    return get('/device/list',params)
  }
}