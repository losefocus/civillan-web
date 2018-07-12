import { get } from '../../axiosconfig/axiosConfig'
export default {
  list() {
    return get('/project/list')
  }
}
