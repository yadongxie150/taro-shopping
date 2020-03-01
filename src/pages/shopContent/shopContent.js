import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { AtTextarea, AtButton, AtFloatLayout } from 'taro-ui'

import taroFetch from '../../utils/request'
import SearchTop from '../search/searchTop'
import ShopGood from '../shopDetail/ShopGood'
import AddGood from '../../components/AddGood'
import ImagePicker from '../../components/ImagePicker'
import './shopContent.scss'

class shopContent extends Component {
  config = {
    navigationBarTitleText: '创建内容',
  }

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      listId: null,
      title: undefined,
      des: undefined,
      good: null,
      images: [],
      goods: [],
      search: undefined,
      hasGood: false,
      showModal: false,
      isInEdit: false,
    }
  }

  componentDidShow() {
    const { listId, id } = this.$router.params
    this.setState(
      {
        listId,
        id,
        isInEdit: !!id,
      },
      () => this.fetchGoodContent()
    )
  }

  componentDidHide() {
    this.setState({
      showModal: false,
    })
  }

  fetchGoodContent = () => {
    const { id, isInEdit } = this.state
    if (!isInEdit) return
    taroFetch({
      url: '/app/goods/getGoodDetailInfo',
      data: {
        goodId: id,
      },
    }).then(data => {
      const { imageInfo, skuName, goodContent, wishGoodDetail } = data
      this.setState({
        images: imageInfo || [],
        title: skuName,
        des: goodContent,
        good: wishGoodDetail,
        hasGood: !!wishGoodDetail,
      })
    })
  }

  handleImages = images => this.setState({ images })

  handleInput = type => e => {
    this.setState({
      [type]: e.target.value,
    })
  }

  submit = () => {
    const { title, des, images, good, listId, id, isInEdit } = this.state
    const params = {
      id,
      listId,
      skuName: title,
      goodContent: des,
      skuId: (good && good.id) || null,
      imageList: images,
    }
    const url = isInEdit
      ? '/app/goods/updateContentGood'
      : '/app/goods/addContentGood'

    taroFetch({
      url,
      method: 'POST',
      data: params,
    })
      .then(() => {
        Taro.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 2000,
        })
        Taro.navigateTo({
          url: `/pages/shopDetail/shopDetail?id=${listId}`,
        })
      })
      .catch()
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
    const { search } = this.state
    // todo: 搜索清单/商品接口
    taroFetch({
      url: '/app/goods/getGoodInfo',
      data: {
        goodInfo: search,
        goodChannel: 2, // 1：京东，2：拼多多，3：淘宝
      },
    })
      .then(data => {
        this.setState({
          goods: data.slice(0, 10) || [],
        })
      })
      .catch(() => {
        this.setState({
          goods: [],
        })
      })
  }

  handleClear = () => {
    this.setState({
      search: '',
      goods: [],
    })
  }

  pickGood = good => {
    this.setState(
      {
        good,
        hasGood: true,
      },
      this.close
    )
  }

  add = () => {
    this.setState({
      showModal: true,
    })
  }

  close = () => {
    this.setState({
      showModal: false,
      search: '',
      goods: [],
    })
  }

  handleDeleteGood = () => {
    this.setState({
      hasGood: false,
      good: {},
    })
  }

  render() {
    const {
      images,
      title,
      des,
      good,
      hasGood,
      search,
      goods,
      showModal,
    } = this.state
    return (
      <View className="shopContent">
        <View className="shopContent-images">
          <ImagePicker
            length={3}
            count={9}
            urls={images}
            onChange={this.handleImages}
          />
        </View>
        <View className="shopContent-item">
          <View className="title">标题</View>
          <AtTextarea
            placeholder="请输入商品/内容标题"
            value={title}
            onChange={this.handleInput('title')}
          />
        </View>
        <View className="shopContent-item">
          <View className="title">相关商品</View>
          {hasGood && (
            <ShopGood showDelete onDelete={this.handleDeleteGood} data={good} />
          )}
          {!hasGood && <AddGood title="添加商品" onClick={this.add} />}
        </View>
        <View className="shopContent-item">
          <View className="title">介绍</View>
          <AtTextarea
            placeholder="请输入商品/内容介绍"
            value={des}
            onChange={this.handleInput('des')}
          />
        </View>
        <AtButton className="shopContent-submit" onClick={this.submit}>
          保存并预览
        </AtButton>
        <AtFloatLayout
          scrollY={false}
          scrollX={false}
          isOpened={showModal}
          onClose={this.close}
        >
          <View className="shopContent-search">
            <View className="shopContent-search-head">
              <SearchTop
                showActionButton
                value={search}
                onChange={this.handleSearch}
                onSearch={this.doSearch}
                onClear={this.handleClear}
              />
            </View>

            <View className="shopContent-search-body">
              {!goods.length && (
                <View className="shopContent-search-empty">
                  暂无商品，请输入关键词搜索
                </View>
              )}
              {goods.length && (
                <ScrollView
                  scrollX={false}
                  scrollY
                  scrollWithAnimation
                  scrollTop={0}
                  style={{
                    height: '600rpx',
                  }}
                >
                  {goods.map(item => (
                    <ShopGood data={item} onClick={() => this.pickGood(item)} />
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}

export default shopContent
