import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'

import { getToken, BASE_URL } from '../../utils/request'

export default class ImagePicker extends Component {
  handleImages = async images => {
    const token = await getToken()
    console.log('current images', images)
    const finalImages = await Promise.all(
      images.map(image => {
        const { url } = image
        console.log('1')
        if (url.indexOf('//tmp/') > -1 || url.indexOf('wxfile:') > -1) {
          console.log('2')
          // 临时图片 url 上传到服务器，获取真实的图片 url
          return Taro.uploadFile({
            url: `${BASE_URL}/app/upload/singleUpload`,
            filePath: url,
            name: 'file',
            header: {
              'Content-Type': 'multipart/form-data',
              'Mini-Token': token,
            },
          })
            .then(res => {
              if (res.statusCode === 200) {
                const result = JSON.parse(res.data)
                const {
                  data: { fileUrl },
                } = result
                console.log('service images success', result.data)
                return fileUrl
              } else {
                Taro.showToast({
                  title: '上传图片出错',
                  duration: 1000,
                })
                console.log(res)
              }
            })
            .catch(error => {
              console.log('error', error)
            })
        }
        console.log('3')
        return Promise.resolve(url)
      })
    )
    this.props.onChange(finalImages)
  }

  render() {
    const { urls = [], length = 3, count = 9 } = this.props
    const files = urls.map(url => ({ url }))
    return (
      <View>
        <AtImagePicker
          length={length}
          count={count}
          files={files}
          onChange={this.handleImages}
        />
      </View>
    )
  }
}
