import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {AtSearchBar} from 'taro-ui'

import { add } from '../../actions/counter'

import Banner from './banner'
import Feature from './feature'
import Recommend from './recommend'
import './home.scss'
import taroFetch from '../../utils/request'

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

  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
  }

  componentDidMount() {
    taroFetch({
      url: 'https://result.eolinker.com/kTmhTKQc3c04ae3c7239f0cb862b8a08f420019fbe02165?uri=/app/getListByType',
    }).then(data => {
      console.log(data)
      this.setState({
        data,
      })
    })
  }

  handleToBottom = () => {
    console.log('滚到底部了')
  }

  handleScroll = () => {
    console.log('scrolling')
  }

  focusSearch = () => {
    console.log('focusSearch')
    Taro.navigateTo({
      url: '/pages/search/search'
    })
  }

  render() {
    return (
      <View className='home'>
        <AtSearchBar onFocus={this.focusSearch} showActionButton placeholder="输入清单/商品名称" />
        <ScrollView
          onScrollToLower={this.handleToBottom}
          onScroll={this.handleScroll}
        >
          <Banner />
          <Feature />
          <Recommend />
        </ScrollView>
      </View>
    )
  }
}

export default Home
