import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import ShopListItem from '../../../components/ShopListItem'
import ShopGood from '../../shopDetail/ShopGood'

import './index.scss'

export default class searchResult extends Component {
  render() {
    const mockData = {
      goods: [
        {name: '1'},
        {name: '2'},
        {name: '3'},
      ],
      shops: [
        {name: '1'},
        {name: '2'},
        {name: '3'},
      ],
    }
    return (
      <View className="searchResult">
        <View>
          <View>清单</View>
          <View>
            {
              mockData.shops.map(item => (
                <ShopListItem />
              ))
            }
          </View>
        </View>
        <View>
          <View>商品</View>
          <View>
            {
              mockData.goods.map(item => (
                <ShopGood />
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}
