import ROUTE from '@/route'
import Toast from '@/libs/vant/toast/toast'

const WXRequest = (path, params = {}, opt = {}) => {
  let _opt = {
    isLoading: true
  }
  _opt = Object.assign(
    _opt,
    opt
  )
  if (_opt.isLoading) {
    Toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: '加载中...'
      // loadingType: 'spinner'
    })
  }
  const P = path.split(':')
  return ROUTE[P[1]][P[0]](params)
    .then(data => {
      _opt.isLoading && Toast.clear()
      return new Promise((resolve, reject) => {
        if (data.code !== 0) {
          Toast.fail(data.data.msg)
          reject(data.data)
        }
        data.msg && Toast.success({
          message: data.msg,
          duration: 500
        })
        resolve(data.data)
      })
    })
}

// 获取我的小区
export const GET_MY_COMMUNITY = () => { return WXRequest('get:/my/community') }
