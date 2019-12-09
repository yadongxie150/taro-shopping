import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'

import bannerImage from '../../../assets/home/banner.jpg'
import './index.scss'
import '../home.scss'

export default function Banner() {
  const list = [
    {
      name: '轮播1',
      src: bannerImage,
    },
    {
      name: '轮播2',
      src: bannerImage,
    },
    {
      name: '轮播3',
      src: bannerImage,
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
