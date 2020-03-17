import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import { AtActionSheet, AtActionSheetItem } from 'taro-ui'

import moreIcon from '../../assets/shopDetail/more.png'
import addIcon from '../../assets/shopDetail/add.png'
import emptyImg from '../../assets/shop/empty.png'

import taroFetch from '../../utils/request'

import ShopHeader from './ShopHeader'
import ShopGood from '../../components/ShopGood'
import AddGood from '../../components/AddGood'
import ShopDetailMsg from './ShopDetailMsg'
import './shopDetail.scss'

class shopDetailPage extends Component {
  config = {
    navigationBarTitleText: '清单详情页',
    navigationBarBackgroundColor: '#484848',
    navigationBarTextStyle: 'white',
  }

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      total: 0,
      data: {
        listGood: {
          wishGoods: [],
        },
        wishList: {},
      },
      showManage: false,
      showDetail: false,
    }
  }

  componentDidShow() {
    const { listId } = this.props
    this.fetchData(listId)
  }

  componentDidHide() {
    this.close()
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
    const { id } = good
    const {
      id: listId,
      data: {
        wishList: { editPermission },
      },
    } = this.state
    Taro.navigateTo({
      url: `/pages/goodDetail/goodDetail?listId=${listId}&id=${id}&editPermission=${editPermission}`,
    })
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

  handleShare = () => {
    taroFetch({
      url: '/app/share/addShare',
      method: 'POST',
      data: {
        id: this.state.id,
      },
    }).then(() => {
      this.fetchData(this.state.id)
    })
  }

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

  /* 滚动逻辑暂时注释
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
  */

  add = () => {
    Taro.navigateTo({
      url: `/pages/search/search?listId=${this.state.id}`,
    })
  }

  editGood = () => {
    Taro.navigateTo({
      url: `/pages/goodList/goodList?listId=${this.state.id}&edit=1`,
    })
  }

  gotoGoodList = () => {
    const {data: {
      wishList: {
        editPermission
      }
    }} = this.state
    Taro.navigateTo({
      url: `/pages/goodList/goodList?listId=${this.state.id}&editPermission=${editPermission}`,
    })
  }

  openDetail = () => {
    this.setState({
      showDetail: true,
    })
  }

  closeDetail = () => {
    this.setState({
      showDetail: false,
    })
  }

  render() {
    const {
      data: { listGood, wishList },
      showManage,
      total,
      showDetail,
    } = this.state
    const { editPermission } = wishList

    if (showDetail) {
      return <ShopDetailMsg data={wishList} onClose={this.closeDetail} />
    }

    return (
      <View className="shopDetail">
        {/* <ShopDetailMsg data={wishList} /> */}
        <ShopHeader
          data={wishList}
          onClick={this.openDetail}
          onEvent={this.handleShopAction}
        />
        <View className="shopContent">
          <View className="shopContent-head">
            <Text>全部商品</Text>
            {editPermission && (
              <View className="shopContent-head-op">
                <Image
                  className="shopContent-head-op-icon icon-add"
                  src={addIcon}
                  onClick={this.add}
                />
                <Image
                  className="shopContent-head-op-icon"
                  src={moreIcon}
                  onClick={this.openModal}
                />
              </View>
            )}
          </View>
          <View className="shopContent-body">
            {listGood.wishGoods.length &&
              listGood.wishGoods.map(good => (
                <ShopGood
                  data={good}
                  onClick={() => this.handleGoodDetail(good)}
                />
              ))}
            {!listGood.wishGoods.length &&
              (editPermission ? (
                <AddGood title="添加商品/内容" onClick={this.add} />
              ) : (
                <View className="empty">暂无商品/内容</View>
              ))}
            {total && total > 10 && (
              <Button onClick={this.gotoGoodList}>查看更多商品</Button>
            )}
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
          <AtActionSheetItem
            className="shopDetail-operation-item"
            onClick={this.editGood}
          >
            编辑商品
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}

export default shopDetailPage
