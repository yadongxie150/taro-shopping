import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'

import moreIcon from '../../assets/shopDetail/more.png'
import addIcon from '../../assets/shopDetail/add.png'

import taroFetch from '../../utils/request'

import ShopHeader from './ShopHeader'
import ShopGood from './ShopGood'
import AddGood from '../../components/AddGood'
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
      pageNum: 1,
      pageSize: 10,
      total: 0,
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

  onShareAppMessage() {
    return {
      title: '清单详情页',
      path: `/pages/shopDetail/shopDetail?id=${this.state.id}`,
    }
  }

  fetchData = id => {
    taroFetch({
      url: '/app/wishList/selectWishListById',
      data: {
        listId: id,
      },
    }).then(data => {
      this.setState({
        id,
        data,
        total: data.listGood.total,
      })
    })
  }

  handleGoodDetail = good => {
    const { id, price } = good
    Taro.navigateTo({
      url: `/pages/goodDetail/goodDetail?id=${id}&isGood=${price ? 1 : 0}`,
    })
  }

  handleBuy = good => {
    console.log(good)
  }

  openModal = () => {
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

  handleComment = () => {
    Taro.navigateTo({
      url: `/pages/shopComment/shopComment?id=${this.state.id}`,
    })
  }
  handleShopAction = type => {
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
      case 'comment':
        this.handleComment()
        break
      default:
        break
    }
  }

  fetchGoods = () => {
    const { pageNum, pageSize, id } = this.state
    taroFetch({
      url: '/app/goods/getListGoods',
      method: 'GET',
      data: {
        listId: id,
        pageNum,
        pageSize,
      },
    }).then(res => {
      this.setState(preState => ({
        ...preState,
        data: {
          ...preState.data,
          listGood: {
            ...preState.data.listGood,
            wishGoods: preState.data.listGood.wishGoods.concat(res.wishGoods),
          },
        },
      }))
    })
  }

  handleScrollToLower = () => {
    const { pageSize, pageNum, total } = this.state
    if (pageSize * pageNum < total) {
      this.setState(
        {
          pageNum: pageNum + 1,
        },
        this.fetchGoods
      )
    }
  }

  add = () => {
    Taro.navigateTo({
      url: `/pages/search/search?listId=${this.state.id}`,
    })
  }

  render() {
    const {
      data: { listGood, wishList },
      showManage,
    } = this.state
    const { editPermission } = wishList
    return (
      <View className='shopDetail'>
        <ShopHeader data={wishList} onClick={this.handleShopAction} />
        <View className='shopContent'>
          <View className='shopContent-head'>
            <Text>全部商品</Text>
            {editPermission && (
              <View className='shopContent-head-op'>
                <Image
                  className='shopContent-head-op-icon icon-add'
                  src={addIcon}
                  onClick={this.add}
                />
                <Image
                  className='shopContent-head-op-icon'
                  src={moreIcon}
                  onClick={this.openModal}
                />
              </View>
            )}
          </View>
          <View className='shopContent-body'>
            {listGood.wishGoods.length && (
              <ScrollView
                scrollX={false}
                scrollY
                scrollWithAnimation
                scrollTop={0}
                style={{
                  height: `800px`,
                }}
                onScrollToLower={this.handleScrollToLower}
              >
                {listGood.wishGoods.map(good => (
                  <ShopGood
                    data={good}
                    onClick={() => this.handleGoodDetail(good)}
                    onBuy={() => this.handleBuy(good)}
                  />
                ))}
              </ScrollView>
            )}
            {!listGood.wishGoods.length && (
              <AddGood title='添加商品' onClick={this.add} />
            )}
          </View>
        </View>
        <AtActionSheet isOpened={showManage} onClose={this.close}>
          <AtActionSheetItem
            className='shopDetail-operation-item'
            onClick={this.edit}
          >
            编辑清单
          </AtActionSheetItem>
          <AtActionSheetItem
            className='shopDetail-operation-item'
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
