import { get } from '../../axiosconfig/axiosConfig'
export default {
  list(params) {
    return get('/foreground/history/records',params)
  }
}
