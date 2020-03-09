import Taro from '@tarojs/taro'
import { Button } from '@tarojs/components'

import './index.scss'

function OpenTypeButton(props) {
  const { openType, onClick, onGetUserInfo } = props
  return (
    <Button
      className="button-nostyle"
      openType={openType}
      onClick={() => onClick && onClick()}
      onGetUserInfo={onGetUserInfo}
    >
      {props.children}
    </Button>
  )
}

export default OpenTypeButton

OpenTypeButton.defaultProps = {
  openType: '',
}
