import request from '@/utils/request.js'
const registerAPI = regForm => {
  return request({
    method: 'post',
    url: '/api/reg',
    data: regForm
  })
}
export { registerAPI }
