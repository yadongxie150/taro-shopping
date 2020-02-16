import Taro, { Component, render } from '@tarojs/taro'
import { Button } from '@tarojs/components'

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
    // this.getUserInfo()
    let userInfo = await getStorage('userInfo')
    console.log(userInfo)
    if (!userInfo) {
      userInfo = await this.getServiceInfo()
      if (!userInfo) {
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
                success: res => {
                  console.log('getUserInfo:', res)
                  this.updateUserInfoToService(res)
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
    }).then(res => {
      taroFetch({
        url: '/app/member/getMemberInfo',
      }).then(res => {
        console.log('/app/member/getMemberInfo', res)
      })
    })
  }

  handleUserInfo = () => {
    this.setState(
      {
        hasAuthorize: true,
      },
      this.getUserInfo()
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
    return this.props.children
  }
}
