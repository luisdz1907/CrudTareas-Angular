import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actividad } from './activiad';
@Injectable({
  providedIn: 'root',
})
export class ActividadesServiceService {
  private urlEndPonit: string = 'http://localhost:8080/api/actividades';

  private HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getActividades(): Observable<Actividad[]> {
    return this.http.get<Actividad[]>(this.urlEndPonit);
  }

  create(actividad: Actividad): Observable<Actividad> {
    return this.http.post<Actividad>(this.urlEndPonit, actividad, {
      headers: this.HttpHeaders,
    });
  }

  getActividad(id: any): Observable<Actividad> {
    return this.http.get<Actividad>(`${this.urlEndPonit}/${id}`);
  }

  update(actividad: Actividad): Observable<Actividad> {
    return this.http.put<Actividad>(
      `${this.urlEndPonit}/${actividad.id}`,
      actividad,
      { headers: this.HttpHeaders }
    );
  }

  delete(id: number): Observable<Actividad> {
    return this.http.delete<Actividad>(`${this.urlEndPonit}/${id}`, {
      headers: this.HttpHeaders,
    });
  }
}
