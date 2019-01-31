import { AV } from '@/storage'
// import { PAGE_SIZE } from '@/config'

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
// const CODE_1 = (msg = '已存在') => ({
//   code: 1,
//   data: {
//     msg
//   }
// })

export default {
  '/my/community': {
    async get () {
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
    }
  }
}
