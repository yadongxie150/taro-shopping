import { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add } from '../../actions/counter'

import Banner from './banner'
import Feature from './feature'
import Recommend from './recommend'
import './home.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add() {
    dispatch(add())
  },
}))
class Home extends Component {
  config = {
    navigationBarTitleText: '好物清单',
    navigationBarBackgroundColor: '#C91623',
    navigationBarTextStyle: 'white',
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='home'>
        {/* <View>
          <Text>搜索全局组件</Text>
        </View> */}
        <Banner />
        <Feature />
        <Recommend />
      </View>
    )
  }
}

export default Home
