export const sliceStr = (str, num) => {
  if (!str) {
    return ''
  }
  return str.length < num ? str : `${str.slice(0, num)}...`
}

export default sliceStr
