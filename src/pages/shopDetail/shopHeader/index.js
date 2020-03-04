import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import { SHOP_TYPE_MAP } from '../../../constants'
import {sliceStr} from '../../../utils/string'

import collectIcon from '../../../assets/shopDetail/collect.png'
import likeIcon from '../../../assets/shopDetail/like.png'
import reviewIcon from '../../../assets/shopDetail/review.png'
import shareIcon from '../../../assets/shopDetail/share.png'

import OpenTypeButton from '../../../components/OpenTypeButton'
import './index.scss'

const shopIconMap = {
  comment: reviewIcon,
  favour: likeIcon,
  share: shareIcon,
  collect: collectIcon,
}

const getOpName = (key, data) => {
  switch (key) {
    case 'collect':
      const { collected } = data
      return `${collected ? '已' : ''}${SHOP_TYPE_MAP[key]}`
    case 'favour':
      const { liked } = data
      return `${liked ? '已' : ''}${SHOP_TYPE_MAP[key]}`
    default:
      return SHOP_TYPE_MAP[key]
  }
}

const getOpNum = (key, data) => {
  switch (key) {
    case 'comment':
      const { commentCount } = data
      return commentCount
    case 'favour':
      const { likeCount } = data
      return likeCount
    case 'share':
      const { shareCount } = data
      return shareCount
    case 'collect':
      const { colectionCount } = data
      return colectionCount
    default:
      return ''
  }
}

export default function ShopHeader(props) {
  const { data, onClick } = props
  const { listName, listDesc, listPic, avatar, nickName } = data

  const shopOperations = Object.keys(SHOP_TYPE_MAP).map(key => ({
    type: key,
    name: getOpName(key, data),
    num: getOpNum(key, data),
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
          <Text className="shopHeader-des">{sliceStr(listDesc, 50)}</Text>
        </View>
      </View>
      <View className="shopHeader-op">
        {shopOperations.map(item => {
          const { name, type, image, num } = item
          if (type === 'share') {
            return (
              <OpenTypeButton openType="share" onClick={() => onClick(type)}>
                <View className="shopHeader-op-item">
                  <Image className="shopHeader-op-icon" src={image} />
                  <Text>
                    {num}·{name}
                  </Text>
                  <Text></Text>
                </View>
              </OpenTypeButton>
            )
          }
          return (
            <View className="shopHeader-op-item" onClick={() => onClick(type)}>
              <Image className="shopHeader-op-icon" src={image} />
              <Text>
                {num}·{name}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

ShopHeader.defaultProps = {
  data: {},
}
