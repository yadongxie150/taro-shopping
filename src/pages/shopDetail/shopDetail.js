import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add } from '../../actions/counter'

import moreIcon from '../../assets/shopDetail/more.png'
import addIcon from '../../assets/shopDetail/add.png'
import bannerImage from '../../assets/home/banner.jpg'

import ShopHeader from './ShopHeader'
import ShopGood from './ShopGood'
import './shopDetail.scss'

const mockData = {
  "code": "0000",
  "data": [
    {
      "id": "主键",
      "listName": "清单名称",
      "listPic": "清单图片",
      "listDesc": "清单描述",
      "memberId": "会员id",
      "createBy": "创建人姓名",
      "goodCount": "商品数量",
      "colectionCount": "100",
      "discountMoney": "优惠总金额",
      "memberAvatar": "创建者头像",
      "goodsInfo": [
        {
          "goodId": "1",
          "goodName": "商品名称1",
          "mainImageUrl": bannerImage,
          "goodChannel": "商品渠道（1：京东，2：拼多多，3：淘宝 后续新增）",
          "goodUrl": "带有佣金的商品链接，跳转小程序使用",
          "goodPrice": "20.00",
          "couponPrice": "优惠券优惠价格（0.00）"
        },
        {
          "goodId": "2",
          "goodName": "商品名称2",
          "mainImageUrl": bannerImage,
          "goodChannel": "商品渠道（1：京东，2：拼多多，3：淘宝 后续新增）",
          "goodUrl": "带有佣金的商品链接，跳转小程序使用",
          "goodPrice": "20.00",
          "couponPrice": "优惠券优惠价格（0.00）"
        },
        {
          "goodId": "3",
          "goodName": "商品名称3",
          "mainImageUrl": bannerImage,
          "goodChannel": "商品渠道（1：京东，2：拼多多，3：淘宝 后续新增）",
          "goodUrl": "带有佣金的商品链接，跳转小程序使用",
          "goodPrice": "10.00",
          "couponPrice": "优惠券优惠价格（0.00）"
        }
      ]
    }
  ],
  "msg": "成功"
}

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
}))
class shopDetail extends Component {
  config = {
    navigationBarTitleText: '清单详情页',
    navigationBarBackgroundColor: '#484848',
    navigationBarTextStyle: 'white',
  }
  // componentWillMount () {
  //   console.log(this.$router.params) // 输出 { id: 2, type: 'test' }
  // }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const {
      goodsInfo,
    } = mockData.data[0]
    return (
      <View className='index'>
        <ShopHeader data={mockData.data[0]} />
        <View className="shopContent">
          <View className="shopContent-head">
            <Text>全部商品</Text>
            <View className="shopContent-head-op">
              <Image className="shopContent-head-op-icon icon-add" src={addIcon} />
              <Image className="shopContent-head-op-icon" src={moreIcon} />
            </View>
          </View>
          <View className="shopContent-body">
            {
              goodsInfo.map(good => (
                <ShopGood data={good} />
              ))
            }
          </View>
        </View>
      </View>

    )
  }
}

export default shopDetail
