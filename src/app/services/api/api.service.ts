import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.BASE_URL;
  httpClient = inject(HttpClient);

  path = {
    USER: 'user',
    USERS: 'users',
  };

  service = {
    post: (url: string, payload: any): Observable<any> =>
      this.httpClient.post(`${this.baseUrl}${url}`, payload),

    put: (url: string, id: string, payload: any): Observable<any> =>
      this.httpClient.put(`${this.baseUrl}${url}${id}`, payload),

    get: (url: string, id: string = ''): Observable<any> =>
      this.httpClient.get(`${this.baseUrl}${url}${id}`),

    delete: (url: string, id: string): Observable<any> =>
      this.httpClient.delete(`${this.baseUrl}${url}/${id}`),
  };
}
