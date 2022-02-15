import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to LocalStorage', error);
    }
  }

  get(key: string): any {
    try {
      let localStorageItem = localStorage.getItem(key);
      return localStorageItem == null ? '' : JSON.parse(localStorageItem);
    } catch (error) {
      console.error('Error getting data from LocalStorage', error);
      return null;
    }
  }
}
