// 清单列表页
import Taro, { Component } from '@tarojs/taro'
import { View, Checkbox, Radio } from '@tarojs/components'

import taroFetch from '../../utils/request'
import ShopGood from '../../components/ShopGood'

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
      selectedIds: [],
      isSelectAll: false,
      isInEdit: false,
    }
  }

  componentDidShow() {
    const { listId, edit, editPermission } = this.$router.params
    console.log(typeof edit, edit)
    this.setState({
      listId,
      isInEdit: !!edit,
      editPermission,
    })
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
    const { selectedIds, list, isInEdit } = this.state
    if (!isInEdit) return
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

  goToDetail = good => () => {
    const {isInEdit, listId, editPermission} = this.state
    if(isInEdit) return
    Taro.navigateTo({
      url: `/pages/goodDetail/goodDetail?listId=${listId}&id=${good.id}&editPermission=${editPermission}`,
    })
  }

  render() {
    const { list, selectedIds, isSelectAll, isInEdit } = this.state
    if (list && !list.length) {
      return null
    }
    return (
      <View className="goodList">
        <View
          className="goodList-box"
          style={{ paddingBottom: isInEdit ? '50px' : '10px' }}
        >
          {list.map(item => {
            return (
              <View
                className="goodList-box-item"
                onClick={this.select(item.id)}
              >
                {isInEdit && (
                  <Checkbox
                    className="goodList-box-item-check"
                    color="#BC1723"
                    checked={selectedIds.includes(item.id)}
                  />
                )}
                <ShopGood data={item} onClick={this.goToDetail(item)} />
              </View>
            )
          })}
        </View>
        {isInEdit && (
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
        )}
      </View>
    )
  }
}

export default GoodList
