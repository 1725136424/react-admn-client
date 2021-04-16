import { CHANGE_NAME } from "../constant";

const initName = '万佳豪'

export default function person(prev = initName, action) {
    const { type, data } = action
    switch (type) {
        case CHANGE_NAME:
            return data
        default:
            return prev
    }
}
