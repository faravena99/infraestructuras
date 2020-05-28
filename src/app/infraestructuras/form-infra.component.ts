import { Component, OnInit, ViewChild } from '@angular/core';
import { InfraestructuraService } from './infraestructura.service';
import { Infraestructura } from './infraestructura';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Provincia } from './provincia';
import { Region } from './region';
import { TipoEstructura } from './tipoEstructura';
import { Visita } from './visita';
import { Cliente } from '../clientes/cliente';

@Component({
  selector: 'app-form-infra',
  templateUrl: './form-infra.component.html'
})
export class FormInfraComponent implements OnInit {
  public infraestructura: Infraestructura = new Infraestructura();
  public titulo = 'Crear Infraestructura';
 
  regiones: Region[];
  provincias: Provincia[];
  tipoEstructuras: TipoEstructura[];
  visitas: Visita[];
  clientes: Cliente[];

  errores: string[];

  constructor(
    private  infraestructuraService: InfraestructuraService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarInfraestructura();
    
  }

  cargarInfraestructura(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.infraestructuraService.getInfraestructura(id).subscribe( (infraestructura) => this.infraestructura = infraestructura);
      }
    });

    this.infraestructuraService.getRegiones().subscribe(regiones => this.regiones = regiones);
    this.infraestructuraService.getProvincia().subscribe(provincias => this.provincias = provincias);
    this.infraestructuraService.getTipoEstructura().subscribe(tipoEstructura => this.tipoEstructuras = tipoEstructura);
    this.infraestructuraService.getVisitas().subscribe(visita => this.visitas = visita);
    this.infraestructuraService.getClientes().subscribe(cliente => this.clientes = cliente);
  }

  create(): void {
    console.log(this.infraestructura);
    this.infraestructuraService.create(this.infraestructura).subscribe(infraestructura => {
      this.router.navigate(['/infraestructuras']);
      swal(
        'Nueva Infraestructura',
        `Infraestructura ha sido creada con éxito!`,
        'success'
      );
    }, err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
    );
  }
  update(): void {
    console.log(this.infraestructura);
    this.infraestructuraService.update(this.infraestructura).subscribe((infraestructura) => {
      this.router.navigate(['/infraestructuras']);
      swal(
        'Infraestructura Actualizada',
        `Infraestructura ha sido actualizado con éxito!`,
        'success'
      );
    },   err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
    );
  }
  compararCliente(o1:Cliente, o2:Cliente):boolean{
    if(o1 === undefined && o2 === undefined){
      return true
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  CompararProvincia(o1:Provincia, o2:Provincia):boolean{
    if(o1 === undefined && o2 === undefined){
      return true
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }

  CompararRegion(o1:Region, o2:Region):boolean{
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

  CompararVisita(o1:Visita, o2:Visita):boolean{
    if(o1 === undefined && o2 === undefined){
      return true
    }
    return o1 == null || o2 == null ? false : o1.id === o2.id;
  }
}
