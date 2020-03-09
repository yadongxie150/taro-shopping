import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Input,
  Textarea,
  Switch,
  Button,
  Image,
} from '@tarojs/components'

import taroFetch, { BASE_URL, getToken } from '../../utils/request'

import './shopEdit.scss'

export default class shopEdit extends Component {
  config = {
    navigationBarTitleText: '编辑清单',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  constructor(props) {
    super(props)
    this.state = {
      id: '1',
      data: {
        listName: '',
        listPic: '',
        privacyType: 0,
        listDesc: '',
      },
    }
  }

  componentDidShow() {
    const { id = 1 } = this.$router.params
    this.fetchData(id)
  }

  fetchData = id => {
    taroFetch({
      url: '/app/wishList/selectWishListById',
      data: {
        listId: id,
      },
    }).then(data => {
      this.setState({
        id,
        data: data.wishList,
      })
    })
  }

  save = () => {
    const {
      id,
      data: { listName, listDesc, privacyType, listPic },
    } = this.state
    taroFetch({
      url: '/app/wishList/updateWishList',
      method: 'POST',
      data: {
        id,
        listName,
        listPic,
        listDesc,
        privacyType: privacyType ? 0 : 1, // 0：公开，1：私有
      },
    }).then(({ id: detailId }) => {
      Taro.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1000,
      })
      Taro.redirectTo({
        url: `/pages/shopDetail/shopDetail?id=${detailId}`,
      })
    })
  }

  handleForm = type => e => {
    this.setState(preState => ({
      data: {
        ...preState.data,
        [type]: e.target.value,
      },
    }))
  }

  uploadImage = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: async res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const {
          tempFilePaths: [imageUrl],
        } = res
        const token = await getToken()
        Taro.uploadFile({
          url: `${BASE_URL}/app/upload/singleUpload`, //仅为示例，非真实的接口地址
          filePath: imageUrl,
          name: 'file',
          header: {
            'Content-Type': 'multipart/form-data',
            'Mini-Token': token,
          },
          success: response => {
            const data = JSON.parse(response.data)
            const {
              data: { fileUrl },
            } = data
            console.log('fileUrl', fileUrl)
            this.updateState('listPic', fileUrl)
          },
        })
      },
    })
  }

  updateState = (key, value) => {
    this.setState(preState => ({
      data: {
        ...preState.data,
        [key]: value,
      },
    }))
  }

  switch = () => {
    this.setState(preState => ({
      privacyType: preState.privacyType === 1 ? 0 : 1,
    }))
  }

  render() {
    const {
      data: { listName, privacyType, listDesc, listPic },
    } = this.state
    return (
      <View className="shopEdit">
        <View className="shopEdit-top">
          <View className="shopEdit-top-item">
            <Text className="label">名称</Text>
            <Input
              maxLength={20}
              value={listName}
              onInput={this.handleForm('listName')}
              placeholder="请输入清单名称"
            />
          </View>
          <View className="shopEdit-top-item">
            <Text>封面</Text>
            <Image className="shopEdit-image" src={listPic} />
            <View onClick={this.uploadImage}>选择封面图片</View>
          </View>
          <View className="shopEdit-top-item">
            <View>
              <View>公开清单</View>
              <View className="des">非公开清单仅自己可见</View>
            </View>
            <Switch
              color="#BC1723"
              checked={!privacyType}
              onClick={this.switch}
            />
          </View>
          {/* <View className="shopEdit-top-item">
            <Text>权限管理</Text>
          </View> */}
        </View>
        {/* <View className="shopEdit-middle">清单标签</View> */}
        <View className="shopEdit-bottom">
          <View className="label">介绍</View>
          <Textarea
            maxlength={200}
            className="textarea"
            placeholder="对清单进行描述"
            value={listDesc}
            onInput={this.handleForm('listDesc')}
          />
        </View>
        <Button onClick={this.save}>保存</Button>
      </View>
    )
  }
}
