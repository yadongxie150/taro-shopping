import defaultImg from '../assets/default.png'
import defaultGood from '../assets/good/default.png'
import defaultShop from '../assets/shop/default.png'

export const getImageUrl = url => url || defaultImg
export const getGoodImageUrl = url => url || defaultGood
export const getShopImageUrl = url => url || defaultShop

export default getImageUrl
