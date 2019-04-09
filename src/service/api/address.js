export default [
  {
    name: 'addReceiveAddressInfo',
    method: 'POST',
    desc: '抽奖订单添加收货地址',
    path: 'v2/lottery/addReceiveAddressInfo.json',
    mockPath: '',
    params: {
      token: '',
      addressId: '',
      orderCode: ''
    }
  },
  {
    name: 'saveAddress',
    method: 'POST',
    desc: '新增收货地址',
    path: 'v2/order/address/save.json',
    mockPath: '',
    params: {
      address: ''
    }
  },
  {
    name: 'deleteAddress',
    method: 'GET',
    desc: '删除收货地址',
    path: 'v2/order/address/delete/:id.json',
    mockPath: '',
    params: {
      token: '',
      id: ''
    }
  },
  {
    name: 'getAllAddress',
    method: 'POST',
    desc: '查询收货地址',
    path: 'v2/order/address/all.json',
    mockPath: '',
    params: {
      token: ''
    }
  },
  {
    name: 'getAddressArea',
    method: 'POST',
    desc: '省市区',
    path: 'v2/order/address/getByCode.json',
    mockPath: '',
    params: {
      code: ''
    }
  }
]
