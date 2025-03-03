import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  logInfo(message: string, data?: any) {
    console.log(`%cINFO: ${message}`, 'color: blue; font-weight: bold', data || '');
  }

  logWarning(message: string, data?: any) {
    console.warn(`%cWARNING: ${message}`, 'color: orange; font-weight: bold', data || '');
  }

  logError(message: string, data?: any) {
    console.error(`%cERROR: ${message}`, 'color: red; font-weight: bold', data || '');
  }
}
