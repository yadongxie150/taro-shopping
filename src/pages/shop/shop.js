import Taro from '@tarojs/taro'

import Authorize from '../../components/Authorize'

import ShopPage from './shopPage'

function Shop() {
  return (
    <Authorize>
      <ShopPage />
    </Authorize>
  )
}

export default Shop
