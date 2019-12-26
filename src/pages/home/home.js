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
      },
    }
  }

  componentDidMount() {
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
              this.setState({
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
    console.log('focusSearch')
    Taro.navigateTo({
      url: '/pages/search/search',
    })
  }

  fetchShopListByType = listType => {
    taroFetch({
      url: '/app/getListByType',
      data: {
        pageNo: 1,
        pageSize: 10,
        listType,
      },
    }).then(data => {
      this.setState(preState => ({
        data: {
          ...preState.data,
          homeList: data,
        },
      }))
    })
  }

  handelRecommend = type => () => {
    console.log(type)
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
