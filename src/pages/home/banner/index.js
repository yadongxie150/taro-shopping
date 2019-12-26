import { View, Swiper, SwiperItem, Image } from '@tarojs/components'

import './index.scss'
import '../home.scss'

export default function Banner(props) {
  if (props && props.data && !props.data.length) {
    return null
  }

  return (
    <View className="home-banner">
      <Swiper circular autoplay interval={2000}>
        {props.data.map(item => (
          <SwiperItem>
            <Image className="home-banner-image" src={item.url} />
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  )
}

Banner.defaultProps = {
  data: [],
}
