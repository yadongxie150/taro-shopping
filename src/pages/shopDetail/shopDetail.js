import Taro, { Component } from '@tarojs/taro'

import Authorize from '../../components/Authorize'

import ShopDetailPage from './shopDetailPage'

export default class ShopDetail extends Component {
  render() {
    const { id } = this.$router.params
    return (
      <Authorize>
        <ShopDetailPage listId={id} />
      </Authorize>
    )
  }
}
