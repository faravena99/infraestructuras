import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Inspeccion } from './inspeccion';
import { InspeccionService } from './inspeccion.service';
import { Fotografia } from './detalle/fotografia';
import { TipoEstructura } from '../infraestructuras/tipoEstructura';
import { Cliente } from '../clientes/cliente';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-form-ins',
  templateUrl: './form-ins.component.html',
})
export class FormInsComponent implements OnInit {
  public inspeccion: Inspeccion = new Inspeccion();
  public titulo = 'Crear Inspeccion';
  public errores: string[];

  clientes: Cliente[];
  tipoEstructuras: TipoEstructura[];
  
  
  fotografias: Fotografia[];

  constructor(
    private inspeccionService: InspeccionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarInspeccion();
 
  }

  cargarInspeccion(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.inspeccionService.getInspeccion(id).subscribe( (inspeccion) => this.inspeccion = inspeccion);
      }
    });
    this.inspeccionService.getClientes().subscribe(cliente => this.clientes = cliente);
    this.inspeccionService.getTipoEstructura().subscribe(tipoEstructura => this.tipoEstructuras = tipoEstructura);
    this.inspeccionService.getFotografias().subscribe(fotografias => this.fotografias = fotografias);

  }

  create(): void {
    console.log(this.inspeccion);
    this.inspeccionService.create(this.inspeccion)
    .subscribe(
      inspeccion => {
      this.router.navigate(['/inspecciones']);
      swal('La nueva inspección', `ha sido creado con éxito!`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
    );
  }

  update(): void {
    console.log(this.inspeccion)
    this.inspeccionService.update(this.inspeccion)
    .subscribe(
      inspeccion => {
      this.router.navigate(['/inspecciones']);
      swal('Inspeccion Actualizado', `La inspeccion ha sido actualizada con éxito!`, 'success');
    }, err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    });
  }

  CompararFotografia(o1:Fotografia, o2:Fotografia):boolean{
    if(o1 === undefined && o2 === undefined){
      return true
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  CompararTipoEstructura(o1:TipoEstructura, o2:TipoEstructura):boolean{
    if(o1 === undefined && o2 === undefined){
      return true
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  CompararCliente(o1:Cliente, o2:Cliente):boolean{
    if(o1 === undefined && o2 === undefined){
      return true
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  

}
