import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'

import taroFetch, { setToken } from '../../utils/request'

import Banner from './banner'
import Feature from './feature'
import Recommend from './recommend'
import SearchTop from '../search/searchTop'

import './home.scss'
import '../search/search.scss'

class Home extends Component {
  config = {
    navigationBarTitleText: '好物清单',
    navigationBarBackgroundColor: '#C91623',
    navigationBarTextStyle: 'white',
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        banner: [],
        homeList: [],
        selectionList: [],
        currentHomeType: 2,
      },
    }
  }

  componentDidMount() {
    taroFetch({
      url: '/app/home/index',
    }).then(homeData => {
      this.setState({
        data: homeData,
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
    Taro.navigateTo({
      url: '/pages/search/search',
    })
  }

  handelRecommend = listType => {
    taroFetch({
      url: '/app/wishList/selectWishList',
      data: {
        pageNum: 1,
        pageSize: 10,
        listType,
      },
    }).then(data => {
      this.setState(preState => ({
        ...preState,
        homeList: data.items,
        currentHomeType: listType,
      }))
    })
  }

  render() {
    const {
      data: { banner, homeList, selectionList },
    } = this.state
    return (
      <View className="home">
        <View onClick={this.focusSearch}>
          <SearchTop disabled />
        </View>
        <ScrollView
          onScrollToLower={this.handleToBottom}
          onScroll={this.handleScroll}
        >
          <Banner data={banner} />
          <Feature data={selectionList} />
          <Recommend data={homeList} onClick={this.handelRecommend} />
        </ScrollView>
      </View>
    )
  }
}

export default Home
