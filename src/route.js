import { AV } from '@/storage'
// import { PAGE_SIZE } from '@/config'

function errHandle (fn) {
  return function (...args) {
    return Promise.resolve(fn(...args)).catch(err => ({
      code: -1,
      data: {
        msg: err.toString()
      }
    }))
  }
}
// const _PAGINATION = (query, page) => {
//   const PAGE = page || 1
//   query.limit(PAGE_SIZE)
//   if (PAGE > 1) {
//     query.skip((PAGE - 1) * PAGE_SIZE)
//   }
//   // 一般分页的都是降序看的，如果有特殊需求可以传参订制
//   query.descending('updatedAt')
// }
const CODE_0 = (data = {}) => ({
  code: 0,
  data: Array.isArray(data)
    ? JSON.parse(JSON.stringify(data))
    : data
})

export default {
  '/my/community': {
    get: errHandle(async function () {
      const USER = await AV.User.current().fetch()
      const CID = USER.get('community')[0]
      if (CID) {
        const QUERY = new AV.Query('Community')
        return QUERY.get(CID)
          .then(community => (
            CODE_0({
              id: community.id,
              name: community.get('name')
            })
          ))
      } else {
        return Promise.resolve(CODE_0())
      }
    })
  }
}
