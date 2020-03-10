import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import { SHOP_STATUS } from '../../../constants'
import { getImageUrl } from '../../../utils/image'
import defaultImg from '../../../assets/default.png'
import './index.scss'

// function component 必须首字母大写
export default function ShopItem(props) {
  const {
    data: {
      listName,
      goodCount,
      listPic,
      privacyType,
      colectionCount,
      wishGoods = [],
    },
    onClick,
  } = props
  return (
    <View className="shopItem" onClick={onClick}>
      <View className="shopItem-header">
        <Image className="shopItem-header-left" src={listPic || defaultImg} />
        <View className="shopItem-header-right">
          <View className="shopItem-header-right-title">{listName}</View>
          <View className="shopItem-header-right-content">
            {SHOP_STATUS[privacyType]} · {goodCount}件商品 · {colectionCount}
            人收藏
          </View>
        </View>
      </View>
      <View className="shopItem-body">
        {wishGoods && wishGoods.length > 0 ? (
          wishGoods.map(item => (
            <Image className="shopItem-body-item" src={item.mainImageUrl} />
          ))
        ) : (
          <Image className="shopItem-body-item" src={getImageUrl()} />
        )}
      </View>
    </View>
  )
}

ShopItem.defaultProps = {
  data: {},
}
