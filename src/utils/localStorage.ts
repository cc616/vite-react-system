export const setLocalStorage = (key: string, value: unknown): void => {
  if (window.localStorage) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = <T = unknown>(key: string): T | null => {
  if (window.localStorage) {
    const value = window.localStorage.getItem(key) || null;
    try {
      return JSON.parse(value as string) as T;
    } catch (err) {
      console.log(err);
      return null;
    }
  } else {
    return null;
  }
};

export const removeLocalStorage = (key: string): void => {
  if (window.localStorage) {
    window.localStorage.removeItem(key);
  }
};
