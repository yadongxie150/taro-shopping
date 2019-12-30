import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import taroFetch, { setToken } from '../../utils/request'

import SearchTop from './searchTop'
import SearchDefault from './searchDefault'
import SearchResult from './searchResult'
import './search.scss'

class Search extends Component {
  config = {
    navigationBarTitleText: '搜索详情页',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      hasResult: false,
      goods: [],
      shopList: [],
    }
  }

  handleSearch = value => {
    this.setState(
      {
        search: value,
      },
      () => {
        if (!value) {
          this.handleClear()
        }
      }
    )
  }

  doSearch = () => {
    const { search } = this.state
    // todo: 搜索清单接口
    taroFetch({
      url: '/app/goods/getGoodInfo',
      data: {
        goodInfo: search,
        goodChannel: 2, // 1：京东，2：拼多多，3：淘宝
      },
    }).then(data => {
      this.setState({
        hasResult: true,
        goods: data,
      })
    })
  }

  handleClear = () => {
    this.setState({
      search: '',
      hasResult: false,
      goods: [],
      shopList: [],
    })
  }

  render() {
    const { search, hasResult, goods, shopList } = this.state
    const searchData = {
      goods,
      shopList,
    }
    return (
      <View className="search">
        <SearchTop
          value={search}
          onChange={this.handleSearch}
          onSearch={this.doSearch}
          onClear={this.handleClear}
        />
        <View className="search-body">
          {hasResult ? <SearchResult data={searchData} /> : <SearchDefault />}
        </View>
      </View>
    )
  }
}

export default Search
