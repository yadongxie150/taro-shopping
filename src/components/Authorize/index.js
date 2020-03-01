import Taro, { Component } from '@tarojs/taro'
import { Button, View } from '@tarojs/components'

import taroFetch from '../../utils/request'
import { setStorage, getStorage } from '../../utils/storage'

export default class Authorize extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasAuthorize: true,
    }
  }

  async componentDidShow() {
    let userInfo = await getStorage('userInfo')
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
    }
    if (!userInfo || !userInfo.nickName) {
      // 没有用户昵称，则意味着没有更新用户信息，此时跳授权页面
      userInfo = await this.getServiceInfo()
      if (!userInfo || !userInfo.nickName) {
        this.setState({
          hasAuthorize: false,
        })
        return
      }
      await setStorage('userInfo', JSON.stringify(userInfo))
    }
  }

  getSystemInfo = () =>
    Taro.getSystemInfo()
      .then(res => res)
      .catch(error => error)

  getUserInfo = () => {
    Taro.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          this.setState({
            hasAuthorize: false,
          })
        } else {
          Taro.authorize({
            scope: 'scope.userInfo',
            success: () => {
              Taro.getUserInfo({
                success: response => {
                  this.updateUserInfoToService(response)
                },
              })
            },
          })
        }
      },
    })
  }

  getServiceInfo = () =>
    taroFetch({
      url: '/app/member/getMemberInfo',
    })
      .then(res => res)
      .catch(error => error)

  updateUserInfoToService = async userData => {
    const { brand, system, model } = await this.getSystemInfo()
    const params = {
      userInfo: {
        ...userData.userInfo,
        encryptedData: userData.encryptedData,
        iv: userData.iv,
      },
      systemInfo: {
        brand,
        system,
        model,
      },
    }
    taroFetch({
      url: '/app/member/updateMemberInfo',
      method: 'POST',
      data: params,
    }).then(() => {
      taroFetch({
        url: '/app/member/getMemberInfo',
      }).then(res => {
        console.log('/app/member/getMemberInfo', res)
      })
    })
  }

  handleUserInfo = info => {
    this.setState(
      {
        hasAuthorize: true,
      },
      () => {
        this.updateUserInfoToService(info.target)
      }
    )
  }

  render() {
    const { hasAuthorize } = this.state
    if (!hasAuthorize) {
      return (
        <Button openType="getUserInfo" onGetUserInfo={this.handleUserInfo}>
          获取用户信息
        </Button>
      )
    }
    return <View>{this.props.children}</View>
  }
}
