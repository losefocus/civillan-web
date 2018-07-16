import { get } from '../../axiosconfig/axiosConfig'
export default {
  list(params) {
    return get('/history/records',params)
  }
}
