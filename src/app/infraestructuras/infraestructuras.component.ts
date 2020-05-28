import { Component, OnInit, ViewChild } from '@angular/core';
import { Infraestructura } from './infraestructura';
import { InfraestructuraService } from './infraestructura.service';
import swal from 'sweetalert2';
import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-infraestructuras',
  templateUrl: './infraestructuras.component.html',
})
export class InfraestructurasComponent implements OnInit {
  infraestructura: Infraestructura[];
  totalRecords: string;
  page: number=1;
  constructor(private infraestructuraService: InfraestructuraService) { }
  

  ngOnInit() {
    this.infraestructuraService
      .getInfraestructuras()
      .subscribe((infraestructura) => (this.infraestructura = infraestructura));

  }

  delete(infraestructura: Infraestructura): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar la infraestructura ?`,
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
        this.infraestructuraService.delete(infraestructura.id).subscribe((response) => {
          this.infraestructura = this.infraestructura.filter(
            (inf) => inf !== infraestructura
          );
          swal(
            'Infraestructura Eliminada!',
            `Infraestructura eliminada con éxito.!`,
            'success'
          );
        });
      }
    });
  }
}
