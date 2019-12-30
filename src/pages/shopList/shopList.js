// 清单列表页
import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import taroFetch from '../../utils/request'

import ShopListItem from '../../components/ShopListItem'

import './shopList.scss'

const TITLE_MAPS = {
  1: '精选清单',
  2: '推荐清单',
  3: '官方清单',
  4: '最新清单',
  5: '人气清单',
}

class ShopList extends Component {
  config = {
    navigationBarTitleText: '精选清单',
    navigationBarBackgroundColor: '#C91623',
    navigationBarTextStyle: 'white',
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const { type } = this.$router.params
    this.fetchShopListByType(type)
  }

  fetchShopListByType = listType => {
    taroFetch({
      url: '/app/wishList/selectWishList',
      data: {
        pageNum: 1,
        pageSize: 10,
        listType,
      },
    }).then(data => {
      this.setState({
        data: data.items,
      })
    })
  }

  render() {
    const { data } = this.state
    if (data && !data.length) {
      return null
    }
    return (
      <View className="shopList fontsize-24">
        <View className="shopList-box">
          {data.map(item => (
            <ShopListItem data={item} />
          ))}
        </View>
      </View>
    )
  }
}

export default ShopList
