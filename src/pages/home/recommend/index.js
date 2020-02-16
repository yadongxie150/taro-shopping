import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
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

  handleToDetail = id => () => {
    Taro.navigateTo({
      url: `/pages/shopDetail/shopDetail?id=${id}`,
    })
  }

  handleActive = active => () => {
    const activeNum = Number(active)
    this.setState({ active: activeNum }, () => {
      this.props.onClick(activeNum)
    })
  }

  handleFresh = () => {
    console.log('刷新')
    this.props.onClick(this.state.active)
  }

  render() {
    const { active } = this.state
    const { data } = this.props

    if (data && !data.length) {
      return null
    }
    return (
      <View className='home-recommend'>
        <View className='home-recommend-header'>
          {Object.keys(recommendTypes).map(key => (
            <View
              key={key}
              className={classnames('home-recommend-header-item', {
                active: active === Number(key),
              })}
              onClick={this.handleActive(key)}
            >
              {recommendTypes[key]}
            </View>
          ))}
          <Button className='fresh' onClick={this.handleFresh}>
            刷新
          </Button>
        </View>
        <View className='home-recommend-body'>
          {data.map(item => (
            <ShopListItem data={item} onClick={this.handleToDetail(item.id)} />
          ))}
        </View>
      </View>
    )
  }
}

Recommend.defaultProps = {
  data: [],
}
