// Local storage management
export const storage = {
  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn('Failed to save to localStorage:', e)
    }
  },
  
  get: <T,>(key: string, defaultValue?: T): T | undefined => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      console.warn('Failed to read from localStorage:', e)
      return defaultValue
    }
  },
  
  remove: (key: string) => {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.warn('Failed to remove from localStorage:', e)
    }
  },
  
  clear: () => {
    try {
      localStorage.clear()
    } catch (e) {
      console.warn('Failed to clear localStorage:', e)
    }
  }
}
