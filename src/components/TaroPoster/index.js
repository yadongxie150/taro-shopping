import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { TaroCanvasDrawer } from 'taro-plugin-canvas'

export default class TaroPoster extends Component {
  render() {
    const config = {
      width: 200,
      height: 600,
    }
    return (
      <View>
        生成海报
        <TaroCanvasDrawer
          config={config}
          onCreateSuccess={() => {}}
          onCreateFail={() => {}}
        />
      </View>
    )
  }
}
