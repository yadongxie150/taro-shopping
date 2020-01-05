import { View, Image } from '@tarojs/components'

import { handlePrice } from '../../../utils/number'
import './index.scss'

// function component 必须首字母大写
export default function ShopGood(props) {
  const { skuName, price, mainImageUrl } = props.data
  return (
    <View className="shopContent-good" onClick={props.onClick}>
      <Image className="shopContent-good-image" src={mainImageUrl} />
      <View className="shopContent-good-content">
        <View>
          <View className="shopContent-good-content-title">{skuName}</View>
          {/* <View className="shopContent-good-content-des">
            商品注释商品注释商品注释商品注释商品注释商品注释
          </View> */}
        </View>
        <View className="shopContent-good-content-footer">
          <View>¥{handlePrice(price)}</View>
          <View
            className="shopContent-good-btn"
            onClick={e => {
              e.stopPropagation()
              props.onBuy()
            }}
          >
            去购买
          </View>
        </View>
      </View>
    </View>
  )
}

ShopGood.defaultProps = {
  data: {},
}
