import { Injectable } from '@angular/core';
import { EnergyComponent } from '../models/energy-component.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ComponentsListResponse {
  items: EnergyComponent[];
  total: number;
  offset: number;
  limit: number;
}

@Injectable({
  providedIn: 'root',
})
export class EnergyComponentsService {
  private readonly baseUrl = 'http://localhost:3000/api/components';
  private readonly historyUrl = 'http://localhost:3000/api/history';

  constructor(private http: HttpClient) {}

  getAll(offset = 0, limit = 50): Observable<ComponentsListResponse> {
    return this.http.get<ComponentsListResponse>(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getById(id: string): Observable<EnergyComponent> {
    return this.http.get<EnergyComponent>(`${this.baseUrl}/${id}`);
  }

  create(component: { name: string; status: string; type: string }): Observable<EnergyComponent> {
    return this.http.post<EnergyComponent>(this.baseUrl, component);
  }

  update(
    id: string,
    changes: Partial<{ name: string; status: string; type: string }>
  ): Observable<EnergyComponent> {
    return this.http.put<EnergyComponent>(`${this.baseUrl}/${id}`, changes);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
