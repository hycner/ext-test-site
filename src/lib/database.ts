// If changing out how data is persisted, then make sure to update the key 'localforage/settings'
import localforage from 'localforage'

localforage.setDriver(localforage.LOCALSTORAGE)

export const db = localforage