import store from 'store'

export const getStore = (key) => store.get(key) || {}

export const setStore = (key, data) => store.set(key, data)

export const removeStore = (key) => store.remove(key)

export const clearStore = () => store.clearAll()
