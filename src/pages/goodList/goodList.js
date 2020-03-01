// 清单列表页
import Taro, { Component } from '@tarojs/taro'
import { View, Checkbox, Radio } from '@tarojs/components'

import taroFetch from '../../utils/request'
import ShopGood from '../shopDetail/ShopGood'

import './goodList.scss'

class GoodList extends Component {
  config = {
    navigationBarTitleText: '商品列表',
    navigationBarBackgroundColor: '#C91623',
    navigationBarTextStyle: 'white',
  }

  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      selectedIds: [],
      isSelectAll: false,
    }
  }

  componentDidShow() {
    const { listId = 45 } = this.$router.params
    this.fetch(listId)
  }

  fetch = listId => {
    taroFetch({
      url: '/app/goods/getListGoods',
      method: 'GET',
      data: {
        listId,
        pageNum: 1,
        pageSize: 50,
      },
    }).then(res => {
      this.setState({
        listId,
        list: res.wishGoods,
      })
    })
  }

  select = id => () => {
    const { selectedIds, list } = this.state
    if (selectedIds.includes(id)) {
      const thisIndex = selectedIds.findIndex(item => item === id)
      selectedIds.splice(thisIndex, 1)
    } else {
      selectedIds.push(id)
    }
    const isSelectAll = selectedIds.length === list.length
    this.setState({
      selectedIds,
      isSelectAll,
    })
  }

  pickAll = () => {
    const { list, isSelectAll } = this.state
    const selectedIds = isSelectAll ? [] : list.map(item => item.id)
    this.setState({
      isSelectAll: !isSelectAll,
      selectedIds,
    })
  }

  delete = () => {
    const { listId, selectedIds } = this.state
    if (selectedIds.length === 0) return
    taroFetch({
      url: '/app/goods/deleteListGood',
      method: 'POST',
      data: {
        listId,
        goodIds: selectedIds,
      },
    }).then(() => {
      this.clear()
      this.fetch(listId)
    })
  }

  clear = () => {
    this.setState({
      selectedIds: [],
      isSelectAll: false,
    })
  }

  render() {
    const { list, selectedIds, isSelectAll } = this.state
    if (list && !list.length) {
      return null
    }
    return (
      <View className="goodList">
        <View className="goodList-box">
          {list.map(item => {
            return (
              <View
                className="goodList-box-item"
                onClick={this.select(item.id)}
              >
                <Checkbox
                  className="goodList-box-item-check"
                  color="#BC1723"
                  checked={selectedIds.includes(item.id)}
                />
                <ShopGood data={item} />
              </View>
            )
          })}
        </View>
        <View className="goodList-operation">
          <View className="goodList-operation-box">
            <Radio
              className="goodList-operation-box-radio"
              color="#BC1723"
              checked={isSelectAll}
              onClick={this.pickAll}
            >
              全选
            </Radio>
            <View
              className="goodList-operation-box-delete"
              onClick={this.delete}
            >
              删除
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default GoodList
