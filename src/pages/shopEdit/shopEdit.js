import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Textarea, Switch, Button } from '@tarojs/components'
import { AtImagePicker } from 'taro-ui'

import taroFetch from '../../utils/request'

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
        listStatus: 0,
        listDesc: '',
      },
      files: [
        {
          url: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg',
        },
      ],
    }
  }

  componentDidMount() {
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
      data: { listName, listDesc, listStatus, listPic },
    } = this.state
    taroFetch({
      url: '/app/wishList/updateWishList',
      method: 'POST',
      data: {
        id,
        listName,
        listPic,
        listDesc,
        listStatus: listStatus ? 0 : 1, // 0：启动，1关闭
      },
    }).then(() => {
      Taro.navigateTo({
        url: `/pages/shopDetail/shopDetail?id=${id}`,
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
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res)
        const {
          tempFilePaths: [imageUrl],
        } = res
        this.setState(preState => ({
          data: {
            ...preState.data,
            listPic: imageUrl,
          },
        }))
      },
    })
  }

  render() {
    const {
      data: { listName, listStatus, listDesc, listPic },
    } = this.state
    return (
      <View className="shopEdit fontsize-24">
        <View className="shopEdit-top">
          <View className="shopEdit-top-item">
            <Text className="label">名称</Text>
            <Input
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
              checked={!listStatus}
              onChange={this.handleForm('listStatus')}
            />
          </View>
          <View className="shopEdit-top-item">
            <Text>权限管理</Text>
          </View>
        </View>
        {/* <View className="shopEdit-middle">清单标签</View> */}
        <View className="shopEdit-bottom">
          <View className="label">介绍</View>
          <Textarea
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
