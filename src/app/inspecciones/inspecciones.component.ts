import { Component, OnInit } from '@angular/core';
import { Inspeccion } from './inspeccion';
import swal from 'sweetalert2';
import { InspeccionService } from './inspeccion.service';
import { ModalService} from './detalle/modal.service';
import { URL_BACKEND } from '../config/config';

@Component({
  selector: 'app-inspecciones',
  templateUrl: './inspecciones.component.html'
})
export class InspeccionesComponent implements OnInit {
  inspecciones: Inspeccion[];
  inspeccionSeleccionado: Inspeccion;
  filterPost = '';
  urlBackend: string = URL_BACKEND;

  constructor(private inspeccionService: InspeccionService,
              public modalService: ModalService ) {}

  ngOnInit() {
    this.inspeccionService
      .getInspecciones()
      .subscribe((inspecciones) => (this.inspecciones = inspecciones));

    this.modalService.notificarUpload.subscribe(inspeccion => {
      this.inspecciones = this.inspecciones.map(inspeccionOriginal => {
        if (inspeccion.id == inspeccionOriginal.id) {
          inspeccionOriginal.foto = inspeccion.foto;
        }
        return inspeccionOriginal;
      });
    });
  }

  delete(inspecciones: Inspeccion): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la inspeccion`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.inspeccionService.delete(inspecciones.id).subscribe((response) => {
          this.inspecciones = this.inspecciones.filter(
            (ins) => ins !== inspecciones
          );
          swal(
            'Inspeccion Eliminada!',
            `Inspeccion ha sido eliminada con éxito.`,
            'success'
          );
        });
      }
    });
  }
  abrirModal(inspeccion: Inspeccion) {
    this.inspeccionSeleccionado = inspeccion;
    this.modalService.abrirModal();
  }

  generarPDF(){
    console.log("Generara un pdf");
  }
}
