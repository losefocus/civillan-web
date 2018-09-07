import { post } from '../../axiosconfig/axiosConfig'
import { get } from '../../axiosconfig/axiosConfig'
import qs from 'qs'
export default {
  getContact(params) {
    return get('/foreground/project_user/get_contact', params)
  },
  deleteContact(params) {
    return post('/foreground/project_user/delete_contact',qs.stringify(params))
  },
  editContact(params) {
    return post('/foreground/project_user/edit_contact',params)
  },
  list(params) {
    return get('/foreground/project_user/list_contact',params)
  },
  addContact(params) {
    return post('/foreground/project_user/add_contact',params)
  },
}
