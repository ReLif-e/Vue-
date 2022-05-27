module.exports = [
  {
    url: '/news/getList',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          total: 100,
          items: [
            { id: 1 }
          ]
        }
      }
    }
  }
]
