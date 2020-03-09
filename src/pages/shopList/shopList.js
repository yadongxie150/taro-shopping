// 清单列表页
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import taroFetch from '../../utils/request'
import ShopListItem from '../../components/ShopListItem'

import './shopList.scss'

class ShopList extends Component {
  config = {
    navigationBarTitleText: '清单列表',
    navigationBarBackgroundColor: '#C91623',
    navigationBarTextStyle: 'white',
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pageNum: 1,
      pageSize: 50,
      total: 0,
    }
  }

  componentDidShow() {
    this.setState(
      {
        data: [],
        pageNum: 1,
        pageSize: 50,
        total: 0,
      },
      this.fetch
    )
  }

  fetch = () => {
    const { type } = this.$router.params
    const shopListUrlMap = {
      myList: '/app/wishList/selectMyAdminWishList',
      collectList: '/app/wishList/selectMyCollectionWishList',
    }
    if (Number(type)) {
      this.fetchShopListByType(type)
    } else {
      this.fetchShopList(shopListUrlMap[type])
    }
  }

  fetchShopList = url => {
    const { pageNum, pageSize } = this.state
    taroFetch({
      url,
      data: {
        pageNum,
        pageSize,
      },
    }).then(({ wishLists = [], total }) => {
      this.setState({
        data: wishLists,
        total: total,
      })
    })
  }

  fetchShopListByType = listType => {
    const { pageNum, pageSize } = this.state
    taroFetch({
      url: '/app/wishList/selectWishList',
      data: {
        pageNum,
        pageSize,
        listType,
      },
    }).then(({ items, total }) => {
      this.setState({
        data: items,
        total: total,
      })
    })
  }

  toDetail = id => {
    Taro.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${id}`,
    })
  }

  // 滚动逻辑暂时删除
  // handleScrollToLower = () => {
  //   const { total, pageSize, pageNum } = this.state
  //   if (pageSize * pageNum < total) {
  //     this.setState(
  //       {
  //         pageNum: pageNum + 1,
  //       },
  //       this.fetch
  //     )
  //   }
  // }

  render() {
    const { data } = this.state
    if (data && !data.length) {
      return null
    }
    return (
      <View className="shopList">
        <View className="shopList-box">
          {data.map(item => (
            <ShopListItem
              key={item.id}
              data={item}
              onClick={() => this.toDetail(item.id)}
            />
          ))}
        </View>
      </View>
    )
  }
}

export default ShopList
