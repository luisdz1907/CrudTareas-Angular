import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from './empleado';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private urlEndPonit:string = "http://localhost:8080/api/empleados";

  private HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(
    //Inyectamos la refrencia
    private http: HttpClient,
  ) { }


  //Obtenemos los empleados desde el servidor
  getEmpleados(): Observable<Empleado[]>{

    //Obtenemos el empleado y lo convertimos en un arreglo
    return this.http.get<Empleado[]>(this.urlEndPonit);

  }

  //Creamos los empleados
  create(empleado: Empleado) : Observable<Empleado>{
    return this.http.post<Empleado>(this.urlEndPonit, empleado, {headers: this.HttpHeaders});
  }

  //Obtenemos el empleado por su id
  getEmpleado(id: any): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.urlEndPonit}/${id}`);
  }

  //Actualizar
  update(empleado: Empleado): Observable<Empleado>{
    return this.http.put<Empleado>(`${this.urlEndPonit}/${empleado.id}`, empleado, {headers: this.HttpHeaders});
  }
  //Eliminar
  delete(id: number): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPonit}/${id}`, {headers: this.HttpHeaders});
  }
}
