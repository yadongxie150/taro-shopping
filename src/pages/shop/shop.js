import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add } from '../../actions/counter'

import ShopItem from './ShopItem'
import addIcon from '../../assets/shop/add.png'
import moreIcon from '../../assets/shop/more.png'


import './shop.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
}))
class Shop extends Component {

  config = {
    navigationBarTitleText: '清单',
    navigationBarBackgroundColor: '#F0F0F0',
    navigationBarTextStyle: 'black',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const mockList = [
      { name: '清单名称1' },
      { name: '清单名称2' },
    ]
    return (
      <View className='shop'>
        <View className="shopBox">
          <View className="shopBox-header">
            <Text>我管理的清单</Text>
            <View className="shopBox-header-op">
              <Image className="shopBox-header-op-icon icon-add" src={addIcon} />
              <Image className="shopBox-header-op-icon" src={moreIcon} />
            </View>
          </View>
          <View className="shopBox-body">
            {mockList.map(item => <ShopItem data={item} />)}
          </View>
        </View>
        <View className="shopBox">
          <View className="shopBox-header">
            <Text>我收藏的清单</Text>
            <View className="shopBox-header-op">
              <Image className="shopBox-header-op-icon icon-add" src={addIcon} />
              <Image className="shopBox-header-op-icon" src={moreIcon} />
            </View>
          </View>
          <View className="shopBox-body">
            {mockList.map(item => <ShopItem data={item} />)}
          </View>
        </View>
      </View>
    )
  }
}

export default Shop
