import ROUTE from '@/route'
const { $Toast } = require('./libs/iview/base/index')

const WXRequest = (path, params = {}, isLoading = true) => {
  if (isLoading) {
    $Toast({
      content: '加载中',
      type: 'loading',
      duration: 0
    })
  }
  const P = path.split(':')
  return ROUTE[P[1]][P[0]](params)
    .then(data => {
      isLoading && $Toast.hide()
      return new Promise((resolve, reject) => {
        if (data.code !== 0) {
          $Toast({
            content: data.data.msg,
            type: 'warning'
          })
          reject(data.data)
        }
        resolve(data.data)
      })
    })
}

// 获取我的小区
export const GET_MY_COMMUNITY = () => { return WXRequest('get:/my/community') }
