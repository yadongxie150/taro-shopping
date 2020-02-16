import Taro, { Component } from '@tarojs/taro'
import { View, Image, Textarea } from '@tarojs/components'

import taroFetch from '../../utils/request'
import './shopComment.scss'

class shopComment extends Component {
  config = {
    navigationBarTitleText: '清单评论',
    navigationBarBackgroundColor: '#F0F0F0',
  }

  constructor(props) {
    super(props)
    this.state = {
      id: null,
      shopData: {},
      comments: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        list: [],
      },
      comment: undefined,
    }
  }

  componentDidMount() {
    const { id } = this.$router.params
    this.fetchData(id)
    this.fetchShopComments(id)
  }

  componentDidShow() {}

  componentDidHide() {}

  fetchData = id => {
    taroFetch({
      url: '/app/wishList/selectWishListById',
      data: {
        listId: id,
      },
    }).then(data => {
      this.setState({
        id,
        shopData: data.wishList,
      })
    })
  }

  fetchShopComments = id => {
    taroFetch({
      url: '/app/comment/getComments',
      data: {
        listId: id,
        pageNum: 1,
        pageSize: 10,
      },
    }).then(data => {
      this.setState({
        comments: {
          ...data,
          list: data.wishListComments,
        },
      })
    })
  }

  handleComment = e => {
    this.setState({
      comment: e.target.value,
    })
  }

  add = () => {
    const { comment, id } = this.state
    taroFetch({
      url: '/app/comment/addComment',
      method: 'POST',
      data: {
        listId: id,
        content: comment,
      },
    }).then(() => {
      this.fetchShopComments(id)
    })
  }

  render() {
    const {
      shopData: { listName, listPic, listDesc },
      comment,
      comments: { list },
    } = this.state
    return (
      <View className='shopComment'>
        <View className='shopComment-shop'>
          <Image className='shopComment-shop-left' src={listPic} />
          <View className='shopComment-shop-right'>
            <View className='shopComment-shop-right-title'>{listName}</View>
            <View className='shopComment-shop-right-des'>{listDesc}</View>
          </View>
        </View>
        <View className='shopComment-comment'>
          <View className='shopComment-comment-head'>全部评论</View>
          <View className='shopComment-comment-body'>
            {list.length &&
              list.map(item => (
                <View className='shopComment-comment-item'>
                  <Image
                    className='shopComment-comment-item-left'
                    src={item.avatar}
                  />
                  <View className='shopComment-comment-item-right'>
                    <View className='user'>{item.nickName}</View>
                    <View className='content'>{item.content}</View>
                    <View className='time'>{item.createTime}</View>
                  </View>
                </View>
              ))}
            {!list.length && (
              <View className='shopComment-empty'>当前暂无评论</View>
            )}
          </View>
        </View>
        <View className='shopComment-add'>
          <Textarea
            className='shopComment-add-left'
            cursorSpacing={120}
            value={comment}
            onInput={this.handleComment}
            placeholder='说点什么......'
          ></Textarea>
          <View className='shopComment-add-right' onClick={this.add}>
            评论
          </View>
        </View>
      </View>
    )
  }
}

export default shopComment
