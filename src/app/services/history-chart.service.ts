import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ComponentHistoryPoint {
  timestamp: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private readonly baseUrl = 'http://localhost:3000/api/history';

  constructor(private http: HttpClient) {}

  getHistory(id: string): Observable<ComponentHistoryPoint[]> {
    return this.http.get<ComponentHistoryPoint[]>(`${this.baseUrl}/${id}`);
  }
}
