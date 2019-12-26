import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Checkbox } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import SearchTop from '../search/searchTop'
import ShopItem from './ShopItem'
import addIcon from '../../assets/shop/add.png'
import moreIcon from '../../assets/shop/more.png'

import './shop.scss'

class Shop extends Component {
  config = {
    navigationBarTitleText: '清单',
    navigationBarBackgroundColor: '#F0F0F0',
    navigationBarTextStyle: 'black',
  }

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      title: undefined,
      isSecret: false,
    }
  }

  add = () => {
    this.setState({
      showModal: true,
    })
  }

  handleCheck = e => {
    console.log(e)
  }

  handleInput = e => {
    console.log(e)
  }

  handleClose = () => {
    this.setState({
      showModal: false,
    })
  }

  handleOk = () => {
    console.log('ok')
    this.setState({
      showModal: false,
    })
  }

  render() {
    const mockList = [{ name: '清单名称1' }, { name: '清单名称2' }]
    const { showModal } = this.state
    return (
      <View className="shop">
        <SearchTop onFocus={this.focusSearch} />
        <View className="shopBox">
          <View className="shopBox-header">
            <Text>我管理的清单</Text>
            <View className="shopBox-header-op" onClick={this.add}>
              <Image
                className="shopBox-header-op-icon icon-add"
                src={addIcon}
              />
              {/* <Image className="shopBox-header-op-icon" src={moreIcon} /> */}
            </View>
          </View>
          <View className="shopBox-body">
            {mockList.map(item => (
              <ShopItem data={item} key={item.name} />
            ))}
          </View>
        </View>
        <View className="shopBox">
          <View className="shopBox-header">
            <Text>我收藏的清单</Text>
            <View className="shopBox-header-op">
              <Image
                className="shopBox-header-op-icon icon-add"
                src={addIcon}
              />
              {/* <Image className="shopBox-header-op-icon" src={moreIcon} /> */}
            </View>
          </View>
          <View className="shopBox-body">
            {mockList.map(item => (
              <ShopItem data={item} key={item.name} />
            ))}
          </View>
        </View>
        <AtFloatLayout isOpened={showModal}>
          <View className="shopEdit">
            <View className="shopEdit-action">
              <View
                className="shopEdit-action-cancel"
                onClick={this.handleClose}
              >
                取消
              </View>
              <View className="shopEdit-action-ok" onClick={this.handleOk}>
                确认
              </View>
            </View>
            <Input
              type="text"
              placeholder="请输入清单标题"
              onInput={this.handleInput}
              className="shopEdit-input"
            />
            <View className="shopEdit-secret">
              <Checkbox onClick={this.handleCheck}>设置为私密清单</Checkbox>
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}

export default Shop
