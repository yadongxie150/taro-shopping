import { View, Text, Image } from '@tarojs/components'

import './index.scss'

const url = 'https://m.360buyimg.com/mobilecms/s150x150_jfs/t1/88885/15/3120/337828/5ddbb8f1E274015b2/0c993245fddb7318.jpg!q70.jpg.dpg'
function Categary() {
  return (
    <View className="home-feature-categary">
      <Image className="home-feature-categary-image" src={url} />
      <View>
        <Text className="home-feature-categary-title">清单名称</Text>
      </View>
    </View>
  )
}

export default Categary
