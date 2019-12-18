import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'

import './search.scss'

const progress = [
  '打开京东APP',
  '复制商品标题',
  '打开好物清单',
  '点击搜索',
]
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
      <View className='search'>
        <View className="search-header">
          <AtSearchBar
            showActionButton
            placeholder="输入清单/商品名称"
            value={search}
            onChange={this.handleSearch}
            onActionClick={this.doSearch}
          />
        </View>
        <View>输入的值：{search}</View>
        <View className="search-body">
          <View className="search-progress">
            <View className="search-progress-header">京东100%的商品都有优惠券或返利</View>
            <View className="search-progress-body">
              {
                progress.map((des, index) => (
                  <View className="search-progress-item">
                    <View className="search-progress-item-left">
                      <View className="search-progress-item-left-num">{index}</View>
                      <View className="search-progress-item-left-des">{des}</View>
                    </View>
                    {index < 3 && <View className="search-progress-item-right"></View>}
                  </View>
                ))
              }
            </View>
          </View>
          <View className="search-exp">
            <View className="search-exp-header">
              <Text>最近搜索</Text>
              <View className="search-exp-clear">清除</View>
            </View>
            <View className="search-exp-body">
              <View className="search-exp-body-item">耳机</View>
              <View className="search-exp-body-item">手机更新迭代</View>
            </View>
          </View>
          <View className="search-exp">
            <View className="search-exp-header">
              <Text>热门搜索</Text>
              <View className="search-exp-clear">清除</View>
            </View>
            <View className="search-exp-body">
              <View className="search-exp-body-item">耳机</View>
              <View className="search-exp-body-item">手机更新迭代</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Search
