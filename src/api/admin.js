import request from '@/util/request'//需要token验证
import requestNull from '@/util/requestNull'//无需token验证
//登录
export function login(data) {
  return requestNull({
    url: '/api/login/login_admin',
    method: 'post',
    data
  })
}
//注册
export function sign(data) {
  return requestNull({
    url: '/api/login/sign',
    method: 'post',
    data
  })
}
//获取角色列表
export function getrolelist(data) {
  return requestNull({
    url: '/api/chatopen/getrolelist',
    method: 'post',
    data
  })
}
//获取聊天记录
export function getchatrecords(data) {
  return request({
    url: '/admin/timedtask/getchatlist',
    method: 'post',
    data
  })
}
//获取聊天记录
export function setMessage(data) {
  return request({
    url: '/admin/Timedtask/open_chatgpt',
    method: 'post',
    data
  })
}
//获取个人信息
export function getuserinfo(data) {
  return request({
    url: '/admin/User/check_user',
    method: 'post',
    data
  })
}
//卡密激活
export function isactivate(data) {
  return request({
    url: '/admin/User/activate',
    method: 'post',
    data
  })
}
//清空当前会话
export function dellist(data) {
  return request({
    url: '/admin/Timedtask/deletelist',
    method: 'post',
    data
  })
}
