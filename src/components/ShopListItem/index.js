import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import { handlePrice } from '../../utils/number'
import { sliceStr } from '../../utils/string'
import { getShopImageUrl } from '../../utils/image'
import './index.scss'

function ShopListItem(props) {
  const {
    listName,
    listPic,
    listDesc,
    goodCount,
    colectionCount,
    discountMoney,
    nickName,
  } = props.data
  return (
    <View className="ShopListItem" onClick={this.props.onClick}>
      <Image className="ShopListItem-left" src={getShopImageUrl(listPic)} />
      <View className="ShopListItem-right">
        <View className="ShopListItem-right-item">
          <View className="ShopListItem-right-title">{listName}</View>
          <View className="ShopListItem-right-des">
            {sliceStr(listDesc, 16) || '暂无描述'}
          </View>
        </View>
        <View className="ShopListItem-right-item">
          <View className="ShopListItem-right-content">
            {goodCount}件商品 · {colectionCount}人收藏 · 优惠 ¥
            {handlePrice(discountMoney)}
          </View>
          <View className="ShopListItem-right-author">@{nickName}</View>
        </View>
      </View>
    </View>
  )
}

export default ShopListItem

ShopListItem.defaultProps = {
  data: {},
}
