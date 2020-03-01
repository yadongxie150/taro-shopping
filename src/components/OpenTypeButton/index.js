import Taro from '@tarojs/taro'
import { Button } from '@tarojs/components'

import './index.scss'

function OpenTypeButton(props) {
  const { openType, onClick } = props
  return (
    <Button
      className="button-nostyle"
      openType={openType}
      onClick={() => onClick && onClick()}
    >
      {props.children}
    </Button>
  )
}

export default OpenTypeButton

OpenTypeButton.defaultProps = {
  openType: '',
}
