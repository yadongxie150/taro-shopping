import { View, Text, Image } from '@tarojs/components'
import './index.scss'

function Categary(props) {
  return (
    <View className="home-feature-categary" onClick={props.onClick}>
      <Image className="home-feature-categary-image" />
      <Text className="home-feature-categary-title">清单名称</Text>
    </View>
  )
}

export default Categary
