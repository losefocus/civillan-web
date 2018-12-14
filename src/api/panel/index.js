import { get } from '../../axiosconfig/axiosConfig'

export default {
  list(params) {
    return get('/foreground/screen/list_device',params)
  },
  warm(params) {
    return get('/foreground/screen/list_alarm',params)
  },
  work(params) {
    return get('/foreground/screen/list_work',params)
  },
  count(params) {
    return get('/foreground/screen/list_count',params)
  },
  alarm(params) {
    return get('/foreground/screen/list_alarm_realtime',params)
  }
}
