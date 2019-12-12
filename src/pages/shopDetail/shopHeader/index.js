import { View, Image, Text } from '@tarojs/components'

import collectIcon from '../../../assets/shopDetail/collect.png'
import likeIcon from '../../../assets/shopDetail/like.png'
import reviewIcon from '../../../assets/shopDetail/review.png'
import shareIcon from '../../../assets/shopDetail/share.png'
import './index.scss'

export default function ShopHeader(props) {
  const {
    listName,
    listDesc,
    createBy,
    colectionCount
  } = props.data
  const shopOperations = [
    {
      name: '评论',
      num: 100,
      image: reviewIcon,
    },
    {
      name: '赞',
      num: 200,
      image: likeIcon,
    },
    {
      name: '分享',
      num: 300,
      image: shareIcon,
    },
    {
      name: '收藏',
      num: colectionCount,
      image: collectIcon,
    },
  ]
  return (
    <View className="shopHeader">
      <View className="shopHeader-msg">
        <View className="shopHeader-msg-left">
          <Image className="shopHeader-author-photo" />
        </View>
        <View className="shopHeader-msg-right">
          <Text>{listName}</Text>
          <View className="shopHeader-author">
            <Image className="shopHeader-author-photo" src={reviewIcon} />
            <Text>{createBy}</Text>
          </View>
          <Text className="shopHeader-des">{listDesc}</Text>
        </View>
      </View>
      <View className="shopHeader-op">
        {
          shopOperations.map(operaion => (
            <View className="shopHeader-op-item">
              <Image className="shopHeader-op-icon" src={operaion.image} />
              <Text>{operaion.num}·{operaion.name}</Text>
            </View>
          ))
        }
      </View>
    </View>
  )
}
