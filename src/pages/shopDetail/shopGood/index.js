import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { handlePrice } from '../../../utils/number'
import './index.scss'

// function component 必须首字母大写
export default function ShopGood(props) {
  const { data, showBuy, showDelete, onBuy, onClick, onDelete } = props
  const { skuName, price, mainImageUrl, goodContent } = data
  return (
    <View className='shopContent-good' onClick={onClick}>
      <Image className='shopContent-good-image' src={mainImageUrl} />
      <View className='shopContent-good-content'>
        {showDelete && (
          <View
            className='shopContent-good-content-close'
            onClick={e => {
              console.log('del 1')
              e.stopPropagation()
              onDelete()
            }}
          >
            <AtIcon value='close-circle' color='#BC1723' />
          </View>
        )}
        <View className='shopContent-good-content-title'>{skuName}</View>
        <View className='shopContent-good-content-des'>{goodContent}</View>
        <View className='shopContent-good-content-footer'>
          <View>¥{handlePrice(price)}</View>
          {showBuy && (
            <View
              className='shopContent-good-btn'
              onClick={e => {
                e.stopPropagation()
                onBuy()
              }}
            >
              去购买
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

ShopGood.defaultProps = {
  data: {},
}
