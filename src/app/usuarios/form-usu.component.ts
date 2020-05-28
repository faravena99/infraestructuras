
import { Component, OnInit } from '@angular/core';
import {Usuario} from './usuario';
import {Router, ActivatedRoute} from '@angular/router';
import swal from 'sweetalert2';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-form-usu',
  templateUrl: './form-usu.component.html'
})
export class FormUsuComponent implements OnInit {

  public usuario: Usuario = new Usuario();
  public titulo = 'Crear Usuario';

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.usuarioService.getUsuario(id).subscribe( (usuario) => this.usuario = usuario);
      }
    });
  }

  create(): void {
    this.usuarioService.create(this.usuario)
      .subscribe(usuario => {
        this.router.navigate(['/usuarios']);
        swal('Nuevo Usuario', `Usuario ${usuario.nombre} ${usuario.apellido} creado con éxito!`, 'success');
      }
      );
  }

  update(): void{
    this.usuarioService.update(this.usuario)
    .subscribe( usuario => {
      this.router.navigate(['/usuarios']);
      swal('Usuario Actualizado', `Usuario ${usuario.nombre} ${usuario.apellido} actualizado con éxito!`, 'success');
    }

    );
  }

}
