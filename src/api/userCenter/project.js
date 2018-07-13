import { get } from '../../axiosconfig/axiosConfig'
export default {
  list() {
    return get('/project/list')
  },
  info(params){
    return get('/project/get',params)
  }
}
