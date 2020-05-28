import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form-cli',
  templateUrl: './form-cli.component.html'
})
export class FormCliComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo = 'Crear Cliente';

  errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente);
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(cliente => {
      this.router.navigate(['/clientes']);
      swal(
        'Nuevo cliente',
        `Cliente ${cliente.rSocial} creado con éxito!`,
        'success'
      );
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      swal(
        'Cliente Actualizado',
        `Cliente ${cliente.rSocial } actualizado con éxito!`,
        'success'
      );
    });
  }
}
