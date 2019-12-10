import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

// import ShopHeader from './shopHeader/index'
// import ShopGood from './shopGood'
import collectIcon from '../../assets/shopDetail/collect.png'
import likeIcon from '../../assets/shopDetail/like.png'
import reviewIcon from '../../assets/shopDetail/review.png'
import shareIcon from '../../assets/shopDetail/share.png'
import './shopDetail.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
}))
class shopDetail extends Component {

  config = {
    navigationBarTitleText: '清单详情页'
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
    return (
      <View className='index'>
        {/* <ShopHeader />
        <ShopGood /> */}
        <View className="shopHeader">
          <View className="shopHeader-msg">
            <View className="shopHeader-msg-left">image</View>
            <View className="shopHeader-msg-right">
              <Text>清单名称</Text>
              <View>
                <Text>advator</Text>
                <Text>创建者</Text>
              </View>
              <Text>描述</Text>
            </View>
          </View>
          <View className="shopHeader-op">
            <View className="shopHeader-op-item">
              <View>
                <Image className="shopHeader-op-icon" src={reviewIcon} />
              </View>
              <View>234·评论</View>
            </View>
            <View className="shopHeader-op-item">
              <View>
                <Image className="shopHeader-op-icon" src={likeIcon} />
              </View>
              <View>234·点赞</View>
            </View>
            <View className="shopHeader-op-item">
              <View>
                <Image className="shopHeader-op-icon" src={collectIcon} />
              </View>
              <View>234·收藏</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default shopDetail
