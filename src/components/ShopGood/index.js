import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { handlePrice } from '../../utils/number'
import { sliceStr } from '../../utils/string'
import { getGoodImageUrl } from '../../utils/image'
import discountImg from '../../assets/good/discount.png'
import discountPriceImg from '../../assets/good/dicount-pirce.png'
import './index.scss'

// function component 必须首字母大写
export default function ShopGood(props) {
  const { data, showBuy, showDelete, onBuy, onClick, onDelete } = props
  // createChannel: 1商品 2内容
  const {
    skuName,
    price,
    mainImageUrl,
    goodContent,
    createChannel = 1,
    discount,
  } = data
  const isGood = Number(createChannel) === 1
  const finalPrice = price - discount
  return (
    <View
      className="shopContent-good"
      onClick={() => {
        onClick && onClick()
      }}
    >
      <Image
        className="shopContent-good-image"
        src={getGoodImageUrl(mainImageUrl)}
      />
      <View className="shopContent-good-content">
        {showDelete && (
          <View
            className="shopContent-good-content-close"
            onClick={e => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <AtIcon value="close-circle" color="#BC1723" />
          </View>
        )}
        <View className="shopContent-good-content-title">{skuName}</View>
        {isGood && discount && (
          <View className="shopContent-good-content-discount">
            <Image src={discountImg} />
            {handlePrice(discount)}元劵
          </View>
        )}
        {!isGood && (
          <View className="shopContent-good-content-des">
            {sliceStr(goodContent || '暂无描述', 60)}
          </View>
        )}
        {isGood && (
          <View className="shopContent-good-content-footer">
            <View className="shopContent-good-content-footer-price">
              ¥{handlePrice(finalPrice)}
              <Image src={discountPriceImg} />
            </View>
            {showBuy && (
              <View
                className="shopContent-good-btn"
                onClick={e => {
                  e.stopPropagation()
                  onBuy()
                }}
              >
                去购买
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  )
}

ShopGood.defaultProps = {
  data: {},
}
