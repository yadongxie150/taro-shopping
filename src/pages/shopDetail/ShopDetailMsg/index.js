import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { getShopImageUrl } from '../../../utils/image'
import { AtIcon } from 'taro-ui'
import './index.scss'

// function component 必须首字母大写
export default function ShopDetailMsg(props) {
  const { onClose, data } = props
  const { listPic, listName, avatar, nickName, listDesc } = data

  return (
    <View className="ShopDetailMsg">
      <View className="ShopDetailMsg-close" onClick={onClose}>
        <AtIcon value="close" onClick={onClose} />
      </View>
      <Image className="ShopDetailMsg-image" src={getShopImageUrl(listPic)} />
      <View>{listName}</View>
      <View className="ShopDetailMsg-author">
        <Image className="ShopDetailMsg-author-photo" src={avatar} />
        <Text>{nickName}</Text>
      </View>
      <View>{listDesc || '暂无描述'}</View>
    </View>
  )
}

ShopDetailMsg.defaultProps = {
  data: {},
}
