import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import taroFetch from '../../utils/request'

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

  componentDidShow() {
    taroFetch({
      url: '/app/home/index',
    }).then(homeData => {
      this.setState({
        data: homeData,
      })
    })
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
        <View onClick={this.focusSearch} className="home-search">
          <SearchTop disabled />
        </View>
        <Banner data={banner} />
        <Feature data={selectionList} />
        <Recommend data={homeList} onClick={this.handelRecommend} />
      </View>
    )
  }
}

export default Home
