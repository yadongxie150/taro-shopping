import Taro from '@tarojs/taro'
import { Button } from '@tarojs/components'

import './index.scss'

function OpenTypeButton(props) {
  const { openType } = props
  return (
    <Button className='button-nostyle' openType={openType}>
      {props.children}
    </Button>
  )
}

export default OpenTypeButton

OpenTypeButton.defaultProps = {
  openType: '',
}
