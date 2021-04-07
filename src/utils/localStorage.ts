export const setLocalStorage = (key: string, value: any) => {
  if (window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}

export const getLocalStorage = <T = any>(key: string): T | null => {
  if (window.localStorage) {
    const value = window.localStorage.getItem(key) || null
    try {
      return JSON.parse(value) as T
    } catch (err) {
      console.log(err)
      return null
    }
  } else {
    return null
  }
}

export const removeLocalStorage = (key: string) => {
  if (window.localStorage) {
    window.localStorage.removeItem(key)
  }
}
