import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

usuarios: Usuario[];
  
constructor(private usuarioService: UsuarioService ) { }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => this.usuarios = usuarios
    );
  }

  delete(usuarios: Usuario): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al usuario ${usuarios.nombre} ${usuarios.apellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.usuarioService.delete(usuarios.id).subscribe(
          response => {
            this.usuarios = this.usuarios.filter(usu => usu !== usuarios);
            swal(
              'Usuario Eliminado!',
              `Usuario ${usuarios.usuario} eliminado con éxito.`,
              'success'
            );
          }
        );

      }
    });
  }

  

}
