import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import ShopListItem from '../../../components/ShopListItem'
import ShopGood from '../../shopDetail/ShopGood'

import './index.scss'

export default class SearchResult extends Component {
  render() {
    const {
      data: { goods, shopList },
      onGoodClick,
      onShopClick,
    } = this.props
    return (
      <View className='searchResult'>
        {shopList.length && (
          <View>
            <View className='searchResult-title'>清单</View>
            <View>
              {shopList.map(item => (
                <ShopListItem
                  data={item}
                  onClick={() => onShopClick(item.id)}
                />
              ))}
            </View>
          </View>
        )}
        {goods.length && (
          <View>
            <View className='searchResult-title'>商品</View>
            <View>
              {goods.map(item => (
                <ShopGood data={item} onClick={() => onGoodClick(item.id)} />
              ))}
            </View>
          </View>
        )}
      </View>
    )
  }
}

SearchResult.defaultProps = {
  data: {
    goods: [],
    shopList: [],
  },
}
