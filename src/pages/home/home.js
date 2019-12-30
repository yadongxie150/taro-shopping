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
    const that = this
    Taro.login({
      success: function(res) {
        if (res.code) {
          // 利用code获取登录状态
          taroFetch({
            url: '/app/auth/loginByJsCode',
            method: 'POST',
            data: {
              jsCode: res.code,
              channel: 'weixin',
            },
          }).then(async loginData => {
            await setToken(loginData.token)
            taroFetch({
              url: '/app/home/index',
            }).then(homeData => {
              that.setState({
                data: homeData,
              })
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
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
      console.log(this.state)
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
        <SearchTop onFocus={this.focusSearch} />
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
