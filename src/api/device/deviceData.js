import { get } from '../../axiosconfig/axiosConfig'

export default {
  list(params) {
    return get('/foreground/realtime/data',params)
  },
  alarms(params) {
    return get('/foreground/realtime/alarms',params)
  },
  history(params){
    return get('/foreground/realtime/history',params)
  },
  replay(params){
    return get('/foreground/history/replay',params)
  }
}
