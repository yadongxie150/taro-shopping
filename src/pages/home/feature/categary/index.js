import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default function Categary(props) {
  const { selectionPic, selectionName } = props.data
  return (
    <View className="home-feature-categary" onClick={props.onClick}>
      <Image className="home-feature-categary-image" src={selectionPic} />
      <Text className="home-feature-categary-title">{selectionName}</Text>
    </View>
  )
}

Categary.defaultProps = {
  data: {},
}
