import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import aboutIcon from '../../assets/user/about.png'
import ideaIcon from '../../assets/user/idea.png'
// import messageIcon from '../../assets/user/message.png'

import taroFetch from '../../utils/request'
import OpenTypeButton from '../../components/OpenTypeButton'
import './user.scss'

class UserPage extends Component {
  config = {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  constructor(props) {
    super(props)
    this.state = {
      userInfo: {},
    }
  }

  componentDidShow() {
    this.getServiceInfo()
  }

  getServiceInfo = () => {
    taroFetch({
      url: '/app/member/getMemberInfo',
    })
      .then(res => this.setState({ userInfo: res }))
      .catch(error => error)
  }

  render() {
    const {
      userInfo: { avatar, nickName, id },
    } = this.state
    return (
      <View className='user'>
        <View className='user-header'>
          <Image className='user-photo' src={avatar} />
          <View className='user-msg'>
            <Text className='user-msg-name'>{nickName}</Text>
            <Text className='user-msg-id'>ID：{id}</Text>
          </View>
        </View>
        {/* <View className="user-item">
          <Image className="user-item-icon" src={messageIcon} />
          消息通知
        </View> */}
        <View className='user-item'>
          <Image className='user-item-icon' src={ideaIcon} />
          <OpenTypeButton openType='feedback'>意见反馈</OpenTypeButton>
        </View>
        <View className='user-item'>
          <Image className='user-item-icon' src={aboutIcon} />
          关于我们
        </View>
      </View>
    )
  }
}

export default UserPage
