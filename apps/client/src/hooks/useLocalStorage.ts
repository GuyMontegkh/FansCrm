import { useState } from 'react';

export const useLocalStorage = <T>(keyName: string, defaultValue: T | null): [T | null, (newValue: T | null) => void] => {
  const [storedValue, setStoredValue] = useState<T | null>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      console.error('Error reading from localStorage', err);
      return defaultValue;
    }
  });

  const setValue = (newValue: T | null) => {
    try {
      if (newValue === null) {
        window.localStorage.removeItem(keyName);
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(newValue));
      }
      setStoredValue(newValue);
    } catch (err) {
      console.error('Error setting localStorage value', err);
    }
  };

  return [storedValue, setValue];
};
