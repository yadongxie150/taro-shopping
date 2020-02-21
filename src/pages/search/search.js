import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classnames from 'classnames'
import { AtButton } from 'taro-ui'

import taroFetch from '../../utils/request'
import { GOOD_CHANNEL, GOOD_CHANNEL_MAP } from '../../constants'

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
      channel: GOOD_CHANNEL_MAP.PIN_DUO_DUO, // 默认查询拼多多
      listId: undefined,
    }
  }

  componentDidMount() {
    const { listId } = this.$router.params
    console.log(listId)
    if (listId) {
      this.setState({
        listId,
      })
    }
  }

  componentDidHide() {
    this.setState({
      listId: undefined,
    })
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
    const { search, channel } = this.state
    taroFetch({
      url: '/app/goods/getGoodInfo',
      data: {
        goodInfo: search,
        goodChannel: channel, // 1：京东，2：拼多多，3：淘宝
      },
    })
      .then(data => {
        this.setState({
          hasResult: true,
          goods: data || [],
        })
      })
      .catch(() => {
        this.setState({
          hasResult: true,
          goods: [],
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

  handleGood = id => {
    Taro.navigateTo({
      url: `/pages/goodDetail/goodDetail?id=${id}`,
    })
  }

  handleShop = id => {
    Taro.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${id}`,
    })
  }

  handleChannel = channel => {
    this.setState(
      {
        channel: Number(channel),
      },
      () => {
        this.doSearch()
      }
    )
  }

  create = () => {
    Taro.navigateTo({
      url: `/pages/shopContent/shopContent?listId=${this.state.listId}`,
    })
  }

  render() {
    const { search, hasResult, goods, shopList, channel, listId } = this.state
    const searchData = {
      goods,
      shopList,
    }
    return (
      <View className='search'>
        <View className='search-head'>
          <SearchTop
            showActionButton
            value={search}
            onChange={this.handleSearch}
            onSearch={this.doSearch}
            onClear={this.handleClear}
          />
        </View>

        <View className='search-body'>
          {hasResult && (
            <View className='search-body-channel'>
              {Object.keys(GOOD_CHANNEL).map(key => (
                <View
                  className={classnames('search-body-channel-item', {
                    active: channel === Number(key),
                  })}
                  key={key}
                  onClick={() => this.handleChannel(key)}
                >
                  {GOOD_CHANNEL[key]}
                </View>
              ))}
            </View>
          )}
          {hasResult ? (
            <SearchResult
              data={searchData}
              onShopClick={this.handleShop}
              onGoodClick={this.handleGood}
            />
          ) : (
            <SearchDefault />
          )}
        </View>
        {listId && <AtButton onClick={this.create}>创建商品/清单</AtButton>}
      </View>
    )
  }
}

export default Search
