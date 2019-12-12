// 清单列表页
import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import ShopListItem from '../../components/ShopListItem'
import './shopList.scss'

class ShopList extends Component {
  config = {
    navigationBarTitleText: '精选清单',
    navigationBarBackgroundColor: '#C91623',
    navigationBarTextStyle: 'white',
  }

  render() {
    const list = [
      { name: '清单名称1' },
      { name: '清单名称2' },
      { name: '清单名称3' },
      { name: '清单名称4' },
      { name: '清单名称5' },
      { name: '清单名称6' },
    ]
    return (
      <View className="shopList">
        <View className="shopList-box">
          {
            list.map(item => (<ShopListItem />))
          }
        </View>
      </View>
    )
  }
}

export default ShopList
