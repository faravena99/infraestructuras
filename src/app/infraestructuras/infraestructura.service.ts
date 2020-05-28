import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Infraestructura } from './infraestructura';
import { map, tap, catchError } from 'rxjs/operators';

import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Region } from './region';
import { Cliente } from '../clientes/cliente';
import { Visita } from './visita';
import { TipoEstructura } from './tipoEstructura';
import { Provincia } from './provincia';
import { URL_BACKEND } from '../config/config';

@Injectable()
export class InfraestructuraService {

  private urlEndPoint = 'http://localhost:8080/api/infraestructuras';
  // private urlEndPoint = URL_BACKEND + '/api/infraestructuras';
  
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient, private router: Router) {}

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint + '/clientes');
  }
  getVisitas(): Observable<Visita[]>{
    return this.http.get<Visita[]>(this.urlEndPoint + '/visitas');
  }
  getTipoEstructura(): Observable<TipoEstructura[]>{
    return this.http.get<TipoEstructura[]>(this.urlEndPoint + '/tipoEstructura');
  }
  getProvincia(): Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.urlEndPoint + '/provincias');
  }

  getInfraestructuras(): Observable<any> {
    return this.http.get(this.urlEndPoint).pipe(tap(response => {
      console.log('InfraestructuraService: tap 1');
      (response as Infraestructura[]).forEach(infraestructura => {
        console.log(infraestructura.nombreEstructura);
      });
    }),
    );
  }

  getInfraestructura(id): Observable<Infraestructura>{
    return this.http.get<Infraestructura>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/inspecciones']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(infraestructura: Infraestructura): Observable<Infraestructura> {
    return this.http.post(this.urlEndPoint, infraestructura, {
      headers: this.httpHeaders}).pipe
      (map ( (response: any) => response.infraestructura as Infraestructura),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
}
  update(infraestructura: Infraestructura): Observable<any> {
    return this.http.put<any>(
      `${this.urlEndPoint}/${infraestructura.id}`, infraestructura, { headers: this.httpHeaders })
      .pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
  delete(id: number): Observable<Infraestructura> {
    return this.http.delete<Infraestructura>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders}).pipe(
        catchError(e => {
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
        );
      }

}

