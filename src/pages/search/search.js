import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classnames from 'classnames'

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
      listId: null,
    }
  }

  componentDidShow() {
    const { listId } = this.$router.params
    if (listId) {
      this.setState({
        listId,
      })
    }
  }

  componentDidHide() {
    this.setState({
      listId: null,
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
    const { search, channel, listId } = this.state
    taroFetch({
      url: '/app/search/searchAll',
      data: {
        searchContent: search,
        goodChannel: channel, // 1：京东，2：拼多多，3：淘宝
      },
    })
      .then(data => {
        const { wishGoods, wishLists } = data
        this.setState({
          hasResult: true,
          shopList: listId ? [] : wishLists,
          goods: wishGoods,
        })
      })
      .catch(() => {
        this.setState({
          hasResult: false,
          goods: [],
          shopList: [],
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

  handleGood = good => {
    const { id, goodChannel } = good
    const { listId } = this.state
    if (!listId) {
      Taro.navigateTo({
        url: `/pages/goodDetail/goodDetail?id=${id}&isGood=1`,
      })
    } else {
      taroFetch({
        url: '/app/goods/addWishList',
        method: 'POST',
        data: {
          goodId: id,
          listId,
          goodChannel,
        },
      }).then(() => {
        Taro.navigateTo({
          url: `/pages/shopDetail/shopDetail?id=${listId}`,
        })
      })
    }
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
      <View className="search">
        <View className="search-head">
          <SearchTop
            placeholder={listId && '输入商品名称'}
            showActionButton
            value={search}
            onChange={this.handleSearch}
            onSearch={this.doSearch}
            onClear={this.handleClear}
          />
        </View>

        <View className="search-body">
          {false && (
            <View className="search-body-channel">
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
            <SearchDefault
              listId={listId}
              channel={channel}
              onAdd={this.create}
            />
          )}
        </View>
      </View>
    )
  }
}

export default Search
