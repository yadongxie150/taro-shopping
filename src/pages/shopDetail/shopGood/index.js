import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { handlePrice } from '../../../utils/number'
import {sliceStr} from '../../../utils/string'
import {getImageUrl} from '../../../utils/image'
import './index.scss'

// function component 必须首字母大写
export default function ShopGood(props) {
  const { data, showBuy, showDelete, onBuy, onClick, onDelete } = props
  // createChannel: 1商品 2内容
  const { skuName, price, mainImageUrl, goodContent, createChannel = 1 } = data
  const isGood = Number(createChannel) === 1
  const des = isGood ? '' : goodContent || '暂无描述'
  return (
    <View
      className="shopContent-good"
      onClick={() => {
        onClick && onClick()
      }}
    >
      <Image className="shopContent-good-image" src={getImageUrl(mainImageUrl)} />
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
        <View className="shopContent-good-content-des">{sliceStr(des, 60)}</View>
        {isGood && (
          <View className="shopContent-good-content-footer">
            <View>¥{handlePrice(price)}</View>
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
