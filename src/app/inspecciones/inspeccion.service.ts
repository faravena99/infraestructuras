import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Inspeccion } from './inspeccion';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TipoEstructura } from '../infraestructuras/tipoEstructura';
import { Cliente } from '../clientes/cliente';
import { Fotografia } from './detalle/fotografia';
import { URL_BACKEND } from '../config/config';

@Injectable()
export class InspeccionService {
  // private urlEndPoint = URL_BACKEND + '/api/inpecciones';
  private urlEndPoint = 'http://localhost:8080/api/inpecciones';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) {}
  
  
  getTipoEstructura(): Observable<TipoEstructura[]>{
    return this.http.get<TipoEstructura[]>(this.urlEndPoint + '/tipoEstructura');
  }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint + '/clientes');
  }

  getFotografias(): Observable<Fotografia[]>{
    return this.http.get<Fotografia[]>(this.urlEndPoint + '/fotografias');
  }

  getInspecciones(): Observable<Inspeccion[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Inspeccion[]));
  }


  getInspeccion(id): Observable<Inspeccion>{
    return this.http.get<Inspeccion>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/inspecciones']);
        console.error(e.error.mensaje);
        swal('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  create(inspeccion: Inspeccion): Observable<Inspeccion> {
    return this.http.post<Inspeccion>(this.urlEndPoint, inspeccion, {
      headers: this.httpHeaders,
    }).pipe(
      map((response: any) => response.inspeccion as Inspeccion),
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
  update(inspeccion: Inspeccion): Observable<any> {
    return this.http.put<any>(
      `${this.urlEndPoint}/${inspeccion.id}`,
      inspeccion,
      { headers: this.httpHeaders }).pipe(
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
  delete(id: number): Observable<Inspeccion> {
    return this.http.delete<Inspeccion>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders}).pipe(
        catchError(e => {
          console.error(e.error.mensaje);
          swal(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
        );
      }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this.http.request(req);

  }
}
