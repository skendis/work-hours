import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  store(key: string, data: any): void {
    localStorage[key] = JSON.stringify(data);
  }

  load(key: string): any {
    const item = localStorage[key] || 'null';
    return JSON.parse(item);
  }
}
