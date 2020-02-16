import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import { handlePrice } from '../../utils/number'
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
    <View className='ShopListItem' onClick={this.props.onClick}>
      <Image className='ShopListItem-left' src={listPic} />
      <View className='ShopListItem-right'>
        <View className='ShopListItem-right-item'>
          <Text className='ShopListItem-right-title'>{listName}</Text>
          <Text className='ShopListItem-right-des'>{listDesc}</Text>
        </View>
        <View className='ShopListItem-right-item'>
          <Text className='ShopListItem-right-content'>
            {goodCount}件商品 · {colectionCount}人收藏 · 优惠 ¥
            {handlePrice(discountMoney)}
          </Text>
          <Text className='ShopListItem-right-author'>@{nickName}</Text>
        </View>
      </View>
    </View>
  )
}

export default ShopListItem

ShopListItem.defaultProps = {
  data: {},
}
