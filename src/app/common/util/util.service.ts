import { Injectable } from '@angular/core';

// Sweet alerts external lib
import Swal from 'sweetalert2';

@Injectable()
export class UtilService {

  constructor() { }

  // Convert the blob to a downloadable file
  downloadFile(data, type: string) {
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  // utility to show an alert
  showAlert(title: string, message?: string, type?: 'warning' | 'error' | 'success' | 'info' | 'question') {
    message = message || '';
    type = type || 'info';
    Swal(title, message, type);
  }
}
