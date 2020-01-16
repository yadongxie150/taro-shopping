import { View, Image } from '@tarojs/components'

import { SHOP_STATUS } from '../../../constants'
import './index.scss'

// function component 必须首字母大写
export default function ShopItem(props) {
  const {
    data: { listName, goodCount, avatar, privacyType, wishGoods = [] },
    onClick,
  } = props
  return (
    <View className="shopItem" onClick={onClick}>
      <View className="shopItem-header">
        <Image className="shopItem-header-left" src={avatar} />
        <View className="shopItem-header-right">
          <View className="shopItem-header-right-title">{listName}</View>
          <View className="shopItem-header-right-content">
            {SHOP_STATUS[privacyType]} · {goodCount}件商品 · {colectionCount}
            人收藏
          </View>
        </View>
      </View>
      <View className="shopItem-body">
        {wishGoods.map(item => (
          <Image className="shopItem-body-item" src={item.mainImageUrl} />
        ))}
      </View>
    </View>
  )
}

ShopItem.defaultProps = {
  data: {},
}
