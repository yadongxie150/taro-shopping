import { View, Image } from '@tarojs/components'

import './index.scss'

// function component 必须首字母大写
export default function ShopGood(props) {
  const {goodName, goodPrice, mainImageUrl} = props.data
  return (
    <View className="shopContent-good">
      <View className="shopContent-good-image">
        <Image src={mainImageUrl} />
      </View>
      <View className="shopContent-good-content">
        <View>
          <View className="shopContent-good-content-title">{goodName}</View>
          <View className="shopContent-good-content-des">商品注释商品注释商品注释商品注释商品注释商品注释</View>
        </View>
        <View className="shopContent-good-content-footer">
          <View>¥{goodPrice}</View>
          <View className="shopContent-good-btn">去购买</View>
        </View>
      </View>
    </View>
  )
}
