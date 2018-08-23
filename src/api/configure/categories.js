import { post , get} from '../../axiosconfig/axiosConfig'
export default {
  list(params) {
    return get('/foreground/product/list_categories', params)
  },
  params(params) {
    return get('/foreground/product/list_params', params)
  },
}
