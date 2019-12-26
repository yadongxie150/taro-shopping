import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classnames from 'classnames'

import ShopListItem from '../../../components/ShopListItem'
import './index.scss'

const recommendTypes = {
  '2': '推荐',
  '3': '官方',
  '4': '最近',
  '5': '人气',
}

const list = []
for (let index = 0; index < 10; index++) {
  const element = { name: '1212' }
  list.push(element)
}

export default class Recommend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 2, // 默认推荐
    }
  }

  handleToDetail = (data, index) => () => {
    console.log(data, index)
    Taro.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${index}`,
    })
  }

  handleActive = active => () => {
    this.setState(
      {
        active,
      },
      () => {
        this.props.onClick(active)
      }
    )
  }

  handleFresh = () => {
    console.log('刷新')
  }

  render() {
    const { active } = this.state
    const { data } = this.props

    if (data && !data.length) {
      return null
    }
    return (
      <View className="home-recommend">
        <View className="home-recommend-header">
          {Object.keys(recommendTypes).map(key => (
            <View
              key={key}
              className={classnames('home-recommend-header-item', {
                active: active === key,
              })}
              onClick={this.handleActive(key)}
            >
              {recommendTypes[key]}
            </View>
          ))}
          <View className="fresh" onClick={this.handleFresh}>
            刷新
          </View>
        </View>
        <View className="home-recommend-body">
          {list.map((item, index) => (
            <ShopListItem onClick={this.handleToDetail(item, index)} />
          ))}
        </View>
      </View>
    )
  }
}

Recommend.defaultProps = {
  data: [],
}
