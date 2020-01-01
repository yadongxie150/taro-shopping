import { View, Image, Text } from '@tarojs/components'

import { SHOP_TYPE_MAP } from '../../../constants'

import collectIcon from '../../../assets/shopDetail/collect.png'
import likeIcon from '../../../assets/shopDetail/like.png'
import reviewIcon from '../../../assets/shopDetail/review.png'
import shareIcon from '../../../assets/shopDetail/share.png'
import './index.scss'

const shopIconMap = {
  comment: reviewIcon,
  favour: likeIcon,
  share: shareIcon,
  collect: collectIcon,
}

export default function ShopHeader(props) {
  const {
    listName,
    listDesc,
    listPic,
    avatar,
    nickName,
    colectionCount,
  } = props.data

  const shopOperations = Object.keys(SHOP_TYPE_MAP).map(key => ({
    type: key,
    name: SHOP_TYPE_MAP[key],
    num: 100,
    image: shopIconMap[key],
  }))

  return (
    <View className="shopHeader">
      <View className="shopHeader-msg">
        <View className="shopHeader-msg-left">
          <Image className="shopHeader-author-photo" src={listPic} />
        </View>
        <View className="shopHeader-msg-right">
          <Text>{listName}</Text>
          <View className="shopHeader-author">
            <Image className="shopHeader-author-photo" src={avatar} />
            <Text>{nickName}</Text>
          </View>
          <Text className="shopHeader-des">{listDesc}</Text>
        </View>
      </View>
      <View className="shopHeader-op">
        {shopOperations.map(operaion => (
          <View
            className="shopHeader-op-item"
            onClick={() => this.props.onClick(operaion.type)}
          >
            <Image className="shopHeader-op-icon" src={operaion.image} />
            <Text>
              {operaion.num}·{operaion.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

ShopHeader.defaultProps = {
  data: {},
}
