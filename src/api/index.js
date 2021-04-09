import {GET, POST} from "./ajax";

//登录
export const login = (data) => POST('/login', data)

// 获取所有用户
export const getAllUsers = () => GET("/manage/user/list")
