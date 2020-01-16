import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import taroFetch from '../../utils/request'
import { handlePrice } from '../../utils/number'
import { GOOD_CHANNEL } from '../../constants'
import ShopListItem from '../../components/ShopListItem'

import './goodDetail.scss'

class GoodDetail extends Component {
  config = {
    navigationBarTitleText: '商品详情页',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      shopList: [],
      data: {},
    }
  }

  componentDidMount() {
    const { id } = this.$router.params
    // todo: 商品详情页
    console.log('商品Id：', id)
    this.fetchGood(id)
  }

  fetchGood = goodId => {
    taroFetch({
      url: '/app/goods/getGoodDetailInfo',
      data: {
        goodId,
      },
    }).then(data => {
      this.setState({
        data,
      })
    })
  }

  fetchShopList = () =>
    taroFetch({
      url: '/app/wishList/selectMyAdminWishList',
      data: {
        pageNum: 1,
        pageSize: 50,
      },
    }).then(data => {
      const { wishLists } = data
      this.setState({
        shopList: wishLists,
      })
    })

  handleCollect = async () => {
    await this.fetchShopList()
    this.setState({
      showModal: true,
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false,
      shopList: [],
    })
  }

  handleBuy = e => {
    e.stopPropagation()
    console.log('buy')
  }

  add = listId => {
    taroFetch({
      url: '/app/goods/addWishList',
      method: 'POST',
      data: {
        goodId: 72,
        listId,
        goodChannel: 1,
      },
    }).then(() => {
      this.handleClose()
      Taro.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000,
      })
    })
  }

  render() {
    const {
      showModal,
      shopList,
      data: {
        skuName,
        mainImageUrl,
        price,
        discount,
        comments,
        skuId,
        goodChannel,
      },
    } = this.state
    const finalPrice = Number(price) - Number(discount)
    return (
      <View className="goodDetail">
        <Image className="goodDetail-image" src={mainImageUrl} />
        <View className="goodDetail-content">
          <View className="goodDetail-content-title">{skuName}</View>
          <View className="goodDetail-content-des">
            <View>
              {GOOD_CHANNEL[goodChannel]}价 ¥{handlePrice(price)}
            </View>
            <View>评论数 {comments}</View>
            <View>好评率 100%</View>
          </View>
          <View className="goodDetail-content-price">
            <View>
              卷后价¥{' '}
              <Text className="goodDetail-content-price-num">
                {handlePrice(finalPrice)}
              </Text>
            </View>
            <View className="goodDetail-content-price-discount">
              优惠卷¥ {handlePrice(discount)}
            </View>
          </View>
          <View className="goodDetail-content-footer">
            <View>{GOOD_CHANNEL[goodChannel]}商品</View>
            <View>品质保证</View>
            <View>无忧售后</View>
          </View>
        </View>
        <View className="goodDetail-num">商品编号：{skuId}</View>
        <View className="goodDetail-action">
          <View className="goodDetail-action-box">
            <View
              className="goodDetail-action-collect"
              onClick={this.handleCollect}
            >
              收藏到清单
            </View>
            <View className="goodDetail-action-buy" onClick={this.handleBuy}>
              去购买
            </View>
          </View>
        </View>
        <AtFloatLayout isOpened={showModal}>
          <View className="taro-modal">
            {/* <View className="taro-modal-header">
              <View className="red">添加商品至清单</View>
              <View onClick={this.handleClose}>取消</View>
            </View> */}
            <View className="taro-modal-body">
              {shopList.map(item => (
                <ShopListItem data={item} onClick={() => this.add(item.id)} />
              ))}
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}

export default GoodDetail
