// 清单列表页
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import taroFetch from '../../utils/request'
import ShopListItem from '../../components/ShopListItem'

import './shopList.scss'

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

  toDetail = id => {
    Taro.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${id}`,
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
            <ShopListItem data={item} onClick={() => this.toDetail(item.id)} />
          ))}
        </View>
      </View>
    )
  }
}

export default ShopList
