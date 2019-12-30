import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Checkbox } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import taroFetch from '../../utils/request'

import SearchTop from '../search/searchTop'
import ShopItem from './ShopItem'
import addIcon from '../../assets/shop/add.png'
// import moreIcon from '../../assets/shop/more.png'

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
      data: {
        myCollectionLists: [],
        myLists: [],
      },
      showModal: false,
      name: '',
      isSecret: false,
    }
  }

  componentDidMount() {
    this.fetchShopList()
  }

  fetchShopList = () => {
    taroFetch({
      url: '/app/wishList/selectAdminAndCollectionWishList',
    }).then(data => {
      const { myCollectionLists, myLists } = data
      this.setState({
        data: {
          myCollectionLists: myCollectionLists.wishLists,
          myLists: myLists.wishLists,
        },
      })
    })
  }

  focusSearch = () => {
    Taro.navigateTo({
      url: '/pages/search/search',
    })
  }

  add = () => {
    this.setState({
      showModal: true,
    })
  }

  handleCheck = () => {
    this.setState(preState => ({
      isSecret: !preState.isSecret,
    }))
  }

  handleInput = e => {
    this.setState({
      name: e.target.value,
    })
  }

  handleClose = () => {
    this.setState({
      showModal: false,
      name: '',
      isSecret: false,
    })
  }

  handleOk = () => {
    const { name, isSecret } = this.state
    console.log(name, isSecret)
    taroFetch({
      url: '/app/wishList/addWishList',
      method: 'POST',
      data: {
        listName: name,
      },
    }).then(() => {
      this.fetchShopList()
      this.handleClose()
    })
  }

  render() {
    const {
      showModal,
      data: { myCollectionLists, myLists },
      name,
      isSecret,
    } = this.state
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
            {myLists.length ? (
              myLists.map(item => <ShopItem data={item} key={item.id} />)
            ) : (
              <View className="shopBox-empty">暂无数据</View>
            )}
          </View>
        </View>
        <View className="shopBox">
          <View className="shopBox-header">
            <Text>我收藏的清单</Text>
          </View>
          <View className="shopBox-body">
            {myCollectionLists.length ? (
              myCollectionLists.map(item => (
                <ShopItem data={item} key={item.id} />
              ))
            ) : (
              <View className="shopBox-empty">暂无数据</View>
            )}
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
              value={name}
              onInput={this.handleInput}
              className="shopEdit-input"
            />
            <View className="shopEdit-secret">
              <Checkbox onClick={this.handleCheck} checked={isSecret}>
                设置为私密清单
              </Checkbox>
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}

export default Shop
