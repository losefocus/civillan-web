import { get } from '../../axiosconfig/axiosConfig'
export default {
  list() {
    return get('/foreground/project/list')
  },
  info(params){
    return get('/foreground/project/get',params)
  }
}
