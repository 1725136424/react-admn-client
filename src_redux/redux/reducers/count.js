import { DECREMENT, INCREMENT } from "../constant";

const initCount = 0

export default function count (prev = initCount, action) {
    const { type, data } = action
    switch (type) {
        case INCREMENT:
            return prev + data
        case DECREMENT:
            return prev - data
        default:
            return prev
    }
}
