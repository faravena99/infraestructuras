import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './modal.service';

import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { Inspeccion } from '../inspeccion';
import { InspeccionService } from '../inspeccion.service';

import { URL_BACKEND } from '../../config/config';

@Component({
  selector: 'detalle-inspeccion',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() inspeccion: Inspeccion;

  titulo: string = "Detalles foto";
  public fotoSeleccionada: File;
  progreso: number = 0;
  public urlBackend: string = URL_BACKEND;

  constructor(private inspeccionService: InspeccionService,
              public modalService: ModalService) { }

  ngOnInit() { }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal('Error seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {

    if (!this.fotoSeleccionada) {
      swal('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.inspeccionService.subirFoto(this.fotoSeleccionada, this.inspeccion.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.inspeccion = response.inspeccion as Inspeccion;

            this.modalService.notificarUpload.emit(this.inspeccion);
            swal('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
