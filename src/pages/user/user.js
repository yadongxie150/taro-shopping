import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import aboutIcon from '../../assets/user/about.png'
import ideaIcon from '../../assets/user/idea.png'
import messageIcon from '../../assets/user/message.png'

import './user.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class User extends Component {

  config = {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='user'>
        <View className="user-header">
          <View className="user-photo" />
          <View className="user-msg">
            <Text className="user-msg-name">用户名</Text>
            <Text className="user-msg-id">ID：00001</Text>
          </View>
        </View>
        <View className="user-item"><Image className="user-item-icon" src={messageIcon} />消息通知</View>
        <View className="user-item"><Image className="user-item-icon" src={ideaIcon} />意见反馈</View>
        <View className="user-item"><Image className="user-item-icon" src={aboutIcon} />关于我们</View>
      </View>
    )
  }
}

export default User
