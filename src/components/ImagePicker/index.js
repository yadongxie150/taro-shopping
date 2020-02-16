import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'

import { getToken, BASE_URL } from '../../utils/request'

export default class ImagePicker extends Component {
  handleImages = async images => {
    const token = await getToken()
    const finalImages = await Promise.all(
      images.map(image => {
        const { url } = image
        if (url.indexOf('//tmp/') > -1) {
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
              const data = JSON.parse(res.data)
              const {
                data: { fileUrl },
              } = data
              return fileUrl
            })
            .catch()
        }
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
