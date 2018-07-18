import { get } from '../../axiosconfig/axiosConfig'
//字典
export default {
  list(params) {
    return get('/foreground/realtime/data',params)
  }
}
