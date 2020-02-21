import Taro from '@tarojs/taro'
import { WebView } from '@tarojs/components'

import { INTRODUCE } from '../../constants'

function About() {
  return <WebView src={INTRODUCE} />
}

export default About
