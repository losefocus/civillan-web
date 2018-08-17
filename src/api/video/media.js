import { get } from '../../axiosconfig/axiosConfig'
export default {
  list(params) {
    return get('/foreground/project_media/list',params)
  },
  camera(params) {
    return get('/foreground//project_camera/list',params)
  }
}
