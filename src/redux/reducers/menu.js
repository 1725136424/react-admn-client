import { SET_MENU } from "../constant";

const initValue = {}

export default function menu(prev = initValue, action) {
    const { type, data } = action
    switch (type) {
        case SET_MENU:
            return data? data: null
        default:
            return prev
    }
}
