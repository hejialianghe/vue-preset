export default [
  {
    name: 'login', // 接口名称
    method: 'POST', // 请求方式POST/GET
    desc: '登陆接口', // 接口描述
    path: '/api/user/login', // 接口地址
    mockPath: '',
    params: { // 配置参数，若无参数，空对象即可
      account: '',
      method: '',
      password: ''
    }
  },
  {
    name: 'GetAffairsSubjectDic',
    method: 'GET',
    desc: '获取',
    path: '/api/Dictionary/GetAffairsSubjectDic',
    mockPath: '',
    params: {}
  }
]
