import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'

import moreIcon from '../../assets/shopDetail/more.png'
import addIcon from '../../assets/shopDetail/add.png'
import bannerImage from '../../assets/home/banner.jpg'

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
    }
  }

  componentDidMount() {
    const { id } = this.$router.params
    this.fetchData(id)
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
      })
    })
  }

  handleGoodDetail = id => {
    console.log('detail')
    Taro.navigateTo({
      url: `/pages/goodDetail/goodDetail?id=${id}`,
    })
  }

  handleBuy = good => {
    console.log(good)
    console.log('buy')
  }

  render() {
    const {
      id,
      data: { listGood, wishList },
    } = this.state
    return (
      <View className="index">
        <ShopHeader data={wishList} />
        <View className="shopContent">
          <View className="shopContent-head">
            <Text>全部商品</Text>
            <View className="shopContent-head-op">
              <Image
                className="shopContent-head-op-icon icon-add"
                src={addIcon}
              />
              <Image className="shopContent-head-op-icon" src={moreIcon} />
            </View>
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
      </View>
    )
  }
}

export default shopDetail
