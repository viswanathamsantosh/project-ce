import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class FileService {
  env = environment;
  constructor(private http: HttpClient) { }
  getFiles(folderId) {
    const headers = new HttpHeaders({'Authorization': `${this.env.apiToken}`});
    return this.http.get(`${this.env.serviceIp}/folders/${folderId}/contents`, {headers: headers});
  }
  uploadFile(formData: FormData, fileName: string, filePath: string) {
    const headers = new HttpHeaders({'Authorization': `${this.env.apiToken}`});
    return this.http.post(`${this.env.serviceIp}/files?path=${filePath}/${fileName}`, formData, {headers: headers});
  }
  getFileByFileId(path: string) {
    const headers = new HttpHeaders({'Authorization': `${this.env.apiToken}`});
    return this.http.get(`${this.env.serviceIp}/files?path=${path}`, {headers: headers, responseType: 'blob'});
  }
}
