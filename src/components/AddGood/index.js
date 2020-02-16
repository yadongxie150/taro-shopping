import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'

function AddGood(props) {
  const { title, onClick } = props
  return (
    <View className="addGood" onClick={onClick}>
      <AtIcon value="add" color="#BC1723" />
      {title}
    </View>
  )
}

export default AddGood

AddGood.defaultProps = {
  title: '',
}
