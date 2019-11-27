import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'

import adminImage from '../../../assets/nav/admin.png'
import homeImage from '../../../assets/nav/home.png'
import userImage from '../../../assets/nav/user.png'
import './index.scss'

export default function Banner() {
  const list = [
    {
      name: '轮播1',
      src: adminImage,
    },
    {
      name: '轮播1',
      src: homeImage,
    },
    {
      name: '轮播1',
      src: userImage,
    },
  ]
  return (
    <View className="home-banner">
      <Swiper
        circular
        autoplay
        indicatorDots
        indicatorActiveColor='rgb(178, 42, 49)'
      >
        {
          list.map(item => (
            <SwiperItem>
              <Image className="home-banner-image" src={item.src} />
            </SwiperItem>
          ))
        }
      </Swiper>
    </View>
  )
}
