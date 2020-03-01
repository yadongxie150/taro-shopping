import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default function Categary(props) {
  const { listName, listPic } = props.data
  return (
    <View className='home-feature-categary' onClick={props.onClick}>
      <Image className='home-feature-categary-image' src={listPic} />
      <Text className='home-feature-categary-title'>{listName}</Text>
    </View>
  )
}

Categary.defaultProps = {
  data: {},
}
