import { SAVE_USER, REMOVE_USER } from "../constant";
import { getStore } from "../../utils/storageUtils";
import { USER_KEY } from "../../constant";

// 读取localStorage中的数据
const initValue = getStore(USER_KEY)

export default function user (prev = initValue, action) {
    const { type, data } = action
    switch (type) {
        case SAVE_USER:
            // 添加
            return data
        case REMOVE_USER:
            // 移除
            return null
        default:
            return prev
    }
}
