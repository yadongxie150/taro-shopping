import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
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
    const progress = [
      '打开京东APP',
      '复制商品标题',
      '打开好物清单',
      '点击搜索',
    ]
    return (
      <View className='search'>
        <View className="search-header">搜索头部组件</View>
        <View className="search-body">
          <View className="search-progress">
            <View className="search-progress-header">京东100%的商品都有优惠券或返利</View>
            <View className="search-progress-body">
              {
                progress.map((des, index) => (
                  <View className="search-progress-item">
                    <View className="search-progress-item-left">
                      <View className="search-progress-item-left-num">{index}</View>
                      <View className="search-progress-item-left-des">{des}</View>
                    </View>
                    {index < 3 && <View className="search-progress-item-right"></View>}
                  </View>
                ))
              }
            </View>
          </View>
          <View className="search-exp">
            <View className="search-exp-header">
              <Text>最近搜索</Text>
              <View className="search-exp-clear">清除</View>
            </View>
            <View className="search-exp-body">
              <View className="search-exp-body-item">耳机</View>
              <View className="search-exp-body-item">手机更新迭代</View>
            </View>
          </View>
          <View className="search-exp">
            <View className="search-exp-header">
              <Text>热门搜索</Text>
              <View className="search-exp-clear">清除</View>
            </View>
            <View className="search-exp-body">
              <View className="search-exp-body-item">耳机</View>
              <View className="search-exp-body-item">手机更新迭代</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Search
