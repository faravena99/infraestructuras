import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, catchError, tap} from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';

import { Router } from '@angular/router';
import swal from 'sweetalert2';

import {URL_BACKEND} from '../config/config';

@Injectable()
export class ClienteService {
  // private urlEndPoint = URL_BACKEND + '/api/clientes';
  private urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<any> {
    return this.http.get(this.urlEndPoint).pipe(tap(response => {
      console.log('ClienteService: tap 1');
      (response as Cliente[]).forEach(cliente => {
        console.log(cliente.nombreCliente);
      });
    }),
    );
  }
  
  getCliente(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {
      headers: this.httpHeaders}).pipe(map ( (response: any) => response.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje),
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }));
  }
  
  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders })
      .pipe( map( (response: any) => response.cliente as Cliente),
        catchError( e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      }));
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }
}
