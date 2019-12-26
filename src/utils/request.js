import Taro from '@tarojs/taro'

const BASE_URL = 'http://fpy229.imwork.net:20631'

const setToken = token => Taro.setStorage({ key: 'token', data: token })
const getToken = () =>
  Taro.getStorage({ key: 'token' })
    .then(res => res.data)
    .catch(() => '')

export default async function fetch(options) {
  const { url, method = 'GET', data, header } = options
  const token = await getToken()

  return Taro.request({
    url: `${BASE_URL}${url}`,
    method,
    data,
    header: {
      ...header,
      'Content-Type': 'application/json',
      'Mini-Token': token,
    },
  })
    .then(response => {
      if (response && response.data && response.data.code === '0000') {
        // 0000: 请求正常
        const { data: result } = response.data
        return result
      }
      return response
    })
    .catch(error => {
      Taro.showToast({
        title: error.message || '接口报错',
        icon: 'none',
        duration: 2000,
      })
    })
}

export { setToken, getToken }
