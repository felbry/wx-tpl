import AV from './libs/av-weapp-min-3.10.0'
import {
  APP_ID,
  APP_KEY
} from '@/config'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export { AV }
