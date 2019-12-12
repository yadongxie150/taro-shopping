import Taro from '@tarojs/taro'

export default function fetch(options) {
  const { url, method = 'GET', data } = options
  return Taro.request({
    url,
    method,
    data,
  }).then(response => {
    if (response && response.data && response.data.code === '0000') {
      // 0000: 请求正常
      const {data: [result]} = response.data
      return result
    }
    return response
  })
}
