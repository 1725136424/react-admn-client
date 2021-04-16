import { REMOVE_USER, SAVE_USER } from "../constant";

export const saveUser = (data) => ({ type: SAVE_USER, data })

export const removeUser = () => ({ type: REMOVE_USER })
