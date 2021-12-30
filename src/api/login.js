import request from '@/utils/request.js'
const loginAPI = loginForm => {
  return request({
    method: 'post',
    url: '/api/login',
    data: loginForm
  })
}
export { loginAPI }
