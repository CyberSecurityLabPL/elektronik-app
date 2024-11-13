import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeDataValue = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value.toString())
  } catch (e) {
    console.warn(`Error saving item with key: ${key}`)
  }
}

export const storeDataObject = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.warn(`Error saving object with key: ${key}`)
  }
}

export const getDataValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
    throw new Error("Item is either null or undefined")
  } catch (e) {
    console.log(`Couldn't retrieve object with key: ${key}`)
    return null
  }
}

export const getDataObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log(`Couldn't retrieve object with key: ${key}`)
  }
}

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.warn(error)
  }
}
