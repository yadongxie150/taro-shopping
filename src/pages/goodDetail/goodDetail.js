import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Swiper, SwiperItem } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import taroFetch from '../../utils/request'
import { handlePrice } from '../../utils/number'
import { getImageUrl } from '../../utils/image'
import { GOOD_CHANNEL, GOOD_CHANNEL_APPID } from '../../constants'
import ShopListItem from '../../components/ShopListItem'
import ShopGood from '../../components/ShopGood'

import './goodDetail.scss'

class GoodDetail extends Component {
  // todo: 兼容内容详情页
  config = {
    navigationBarTitleText: '商品详情页',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  constructor(props) {
    super(props)
    this.state = {
      listId: '',
      isGood: true,
      id: null,
      showModal: false,
      shopList: [],
      data: {},
    }
  }

  componentDidShow() {
    const { listId, id } = this.$router.params
    this.setState({
      listId,
      id,
    })
    this.fetchGood(id)
  }

  componentDidHide() {
    this.setState({
      showModal: false,
    })
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
        isGood: Number(data.createChannel) === 1,
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

  handleBuyEdit = e => {
    e.stopPropagation()
    const { isGood, id, listId } = this.state
    if (isGood) {
      this.buy()
    } else {
      Taro.navigateTo({
        url: `/pages/shopContent/shopContent?id=${id}&listId=${listId}`,
      })
    }
  }

  buy = goodId => {
    const { listId } = this.state
    taroFetch({
      url: '/app/goods/getGoodBuyInfo',
      data: {
        listId: listId || '',
        goodId: goodId || this.state.id,
      },
    })
      .then(res => {
        const { goodChannel, pagePath } = res
        Taro.navigateToMiniProgram({
          appId: GOOD_CHANNEL_APPID[goodChannel],
          path: pagePath,
        })
      })
      .catch(err => err)
  }

  add = listId => {
    const {
      id,
      data: { goodChannel },
    } = this.state
    taroFetch({
      url: '/app/goods/addWishList',
      method: 'POST',
      data: {
        goodId: id,
        listId,
        goodChannel,
      },
    }).then(() => {
      Taro.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000,
      })
      this.handleClose()
      Taro.navigateTo({
        url: `/pages/shopDetail/shopDetail?id=${listId}`,
      })
    })
  }

  handleContentGoodBuy = () => {
    const {
      data: {
        wishGoodDetail: { id },
      },
    } = this.state
    this.buy(id)
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
        goodContent,
        wishGoodDetail,
        imageInfo,
      },
      isGood,
    } = this.state
    const finalPrice = Number(price) - Number(discount)
    return (
      <View className="goodDetail">
        {isGood ? (
          <Image className="goodDetail-image" src={mainImageUrl} />
        ) : (
          <Swiper
            className="goodDetail-swiper"
            circular
            autoplay
            interval={3000}
          >
            {imageInfo && imageInfo.length > 0 ? (
              imageInfo.map(url => (
                <SwiperItem>
                  <Image className="goodDetail-image" src={url} />
                </SwiperItem>
              ))
            ) : (
              <Image className="goodDetail-image" src={getImageUrl()} />
            )}
          </Swiper>
        )}
        {isGood ? (
          <View>
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
          </View>
        ) : (
          <View className="goodDetail-content">
            <View className="goodDetail-content-title">{skuName}</View>
            {wishGoodDetail && (
              <ShopGood
                showBuy
                data={wishGoodDetail}
                onClick={this.handleContentGoodBuy}
              />
            )}
            <View className="goodDetail-content-des">
              {goodContent || '暂无描述'}
            </View>
          </View>
        )}
        <View className="goodDetail-action">
          <View className="goodDetail-action-box">
            <View
              className="goodDetail-action-collect"
              onClick={this.handleCollect}
            >
              收藏到清单
            </View>
            <View
              className="goodDetail-action-buy"
              onClick={this.handleBuyEdit}
            >
              {isGood ? '购买' : '编辑'}
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
