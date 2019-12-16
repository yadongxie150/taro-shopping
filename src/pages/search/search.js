import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add } from '../../actions/counter'

import './search.scss'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  }
}))
class Search extends Component {

  config = {
    navigationBarTitleText: '搜索详情页',
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
      <View className='goodDetail'>
        搜索详情页
      </View>
    )
  }
}

export default Search
