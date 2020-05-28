import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Usuario } from './usuario';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { URL_BACKEND } from '../config/config';

@Injectable()
export class UsuarioService {
// private urlEndPoint = URL_BACKEND + '/api/usuarios';
private urlEndPoint = 'http://localhost:8080/api/usuarios';

private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

constructor(private http: HttpClient) { }

getUsuarios(): Observable<any> {
  return this.http.get(this.urlEndPoint).pipe(tap(response => {
    console.log('UsuarioService: tap 1');
    (response as Usuario[]).forEach(usuario => {
      console.log(usuario.usuario);
    });
  }),
  );
}

getUsuario(id): Observable<Usuario>{
  return this.http.get<Usuario>(`${this.urlEndPoint}/${id}`);
}

create(usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(this.urlEndPoint, usuario,
  {headers: this.httpHeaders}).pipe(map ( (response: any) => response.usuario as Usuario),
  catchError(e => {
    console.error(e.error.mensaje),
    swal(e.error.mensaje, e.error.error, 'error');
    return throwError(e);
  }));
}
update(usuario: Usuario): Observable<Usuario>{
  return this.http.put<Usuario>(`${this.urlEndPoint}/${usuario.id}`, usuario,
  {headers: this.httpHeaders})  .pipe( map( (response: any) => response.usuario as Usuario),
  catchError( e => {
  console.error(e.error.mensaje);
  swal(e.error.mensaje, e.error.error, 'error');
  return throwError(e);
}));
}


delete(id: number): Observable<Usuario>{
  return this.http.delete<Usuario>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
}

}



