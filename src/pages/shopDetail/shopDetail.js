import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'

import moreIcon from '../../assets/shopDetail/more.png'
import addIcon from '../../assets/shopDetail/add.png'

import taroFetch from '../../utils/request'

import ShopHeader from './ShopHeader'
import ShopGood from './ShopGood'
import './shopDetail.scss'

class shopDetail extends Component {
  config = {
    navigationBarTitleText: '清单详情页',
    navigationBarBackgroundColor: '#484848',
    navigationBarTextStyle: 'white',
  }

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      data: {
        listGood: {
          wishGoods: [],
        },
        wishList: {},
      },
      showManage: false,
    }
  }

  componentDidMount() {
    const { id } = this.$router.params
    this.fetchData(id)
  }

  onShareAppMessage(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '清单',
      path: `/pages/goodDetail/goodDetail?id=${id}`,
    }
  }

  fetchData = id => {
    taroFetch({
      url: '/app/wishList/selectWishListById',
      data: {
        listId: id,
        pageNum: 1,
        pageSize: 100,
      },
    }).then(data => {
      this.setState({
        id,
        data,
      })
    })
  }

  handleGoodDetail = id => {
    Taro.navigateTo({
      url: `/pages/goodDetail/goodDetail?id=${id}`,
    })
  }

  handleBuy = good => {
    console.log(good)
    console.log('buy')
  }

  open = () => {
    this.setState({
      showManage: true,
    })
  }

  close = () => {
    this.setState({
      showManage: false,
    })
  }

  edit = () => {
    Taro.navigateTo({
      url: `/pages/shopEdit/shopEdit?id=${this.state.id}`,
    })
  }

  delete = () => {
    console.log('del')
    taroFetch({
      url: '/app/wishList/deleteList',
      method: 'POST',
      data: {
        id: this.state.id,
      },
    }).then(() => {
      Taro.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1000,
      })
      Taro.switchTab({
        url: '/pages/shop/shop',
      })
    })
  }

  handleCollect = () => {
    const {
      data: {
        wishList: { collected },
      },
    } = this.state
    taroFetch({
      url: '/app/wishList/addOrCancleListCollection',
      method: 'POST',
      data: {
        listId: this.state.id,
      },
    }).then(() => {
      Taro.showToast({
        title: collected ? '取消收藏' : '收藏成功',
        icon: 'success',
        duration: 1000,
      })
      this.fetchData(this.state.id)
    })
  }

  handleFavour = () => {
    const {
      data: {
        wishList: { liked },
      },
    } = this.state
    taroFetch({
      url: '/app/wishList/addOrCancleListLike',
      method: 'POST',
      data: {
        listId: this.state.id,
      },
    }).then(() => {
      Taro.showToast({
        title: liked ? '取消点赞' : '点赞成功',
        icon: 'success',
        duration: 1000,
      })
      this.fetchData(this.state.id)
    })
  }

  handleShare = () => {}

  handleShopAction = type => {
    console.log(type)
    switch (type) {
      case 'collect':
        this.handleCollect()
        break
      case 'share':
        this.handleShare()
        break
      case 'favour':
        this.handleFavour()
        break
      default:
        break
    }
  }

  render() {
    const {
      id,
      data: { listGood, wishList },
      showManage,
    } = this.state
    const { editPermission } = wishList
    return (
      <View className="shopDetail">
        <ShopHeader data={wishList} onClick={this.handleShopAction} />
        <View className="shopContent">
          <View className="shopContent-head">
            <Text>全部商品</Text>
            {editPermission && (
              <View className="shopContent-head-op">
                {/* <Image
                className="shopContent-head-op-icon icon-add"
                src={addIcon}
              /> */}
                <Image
                  className="shopContent-head-op-icon"
                  src={moreIcon}
                  onClick={this.open}
                />
              </View>
            )}
          </View>
          <View className="shopContent-body">
            {listGood.wishGoods.map(good => (
              <ShopGood
                data={good}
                onClick={() => this.handleGoodDetail(good.id)}
                onBuy={() => this.handleBuy(good)}
              />
            ))}
          </View>
        </View>
        <AtActionSheet isOpened={showManage} onClose={this.close}>
          <AtActionSheetItem
            className="shopDetail-operation-item"
            onClick={this.edit}
          >
            编辑清单
          </AtActionSheetItem>
          <AtActionSheetItem
            className="shopDetail-operation-item"
            onClick={this.delete}
          >
            删除清单
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}

export default shopDetail
