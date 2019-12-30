import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import ShopListItem from '../../../components/ShopListItem'
import ShopGood from '../../shopDetail/ShopGood'

import './index.scss'

export default class SearchResult extends Component {
  render() {
    const { goods, shopList } = this.props.data
    return (
      <View className="searchResult">
        {shopList.length && (
          <View>
            <View>清单</View>
            <View>
              {shopList.map(item => (
                <ShopListItem data={item} />
              ))}
            </View>
          </View>
        )}
        {goods.length && (
          <View>
            <View>商品</View>
            <View>
              {goods.map(item => (
                <ShopGood data={item} />
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
