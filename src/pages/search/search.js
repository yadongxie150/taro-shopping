import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

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
    }
  }

  handleSearch = value => {
    console.log(value)
    this.setState({
      search: value,
    })
  }

  doSearch = () => {
    console.log('do srarch')
    console.log(this.state)
  }

  render() {
    const { search } = this.state
    return (
      <View className="search">
        <SearchTop
          value={search}
          onChange={this.handleSearch}
          onSearch={this.doSearch}
        />
        <View className="search-body">
          {!!search ? <SearchResult /> : <SearchDefault />}
        </View>
      </View>
    )
  }
}

export default Search
