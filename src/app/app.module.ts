// imports necesarios
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//navbar
import { HeadComponent } from './header/head/head.component';

//vistas principales
import { InfraestructurasComponent } from './infraestructuras/infraestructuras.component';
import { InspeccionesComponent } from './inspecciones/inspecciones.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

//vista modal
import { DetalleComponent } from './inspecciones/detalle/detalle.component' ;

// forms
import { FormInfraComponent } from './infraestructuras/form-infra.component';
import { FormUsuComponent} from './usuarios/form-usu.component';
import { FormInsComponent } from './inspecciones/form-ins.component';
import { FormCliComponent } from './clientes/form-cli.component';

// rutas
import {RouterModule, Routes} from '@angular/router';

// servicios
import { ClienteService } from './clientes/cliente.service';
import { UsuarioService } from './usuarios/usuario.service';
import { InfraestructuraService } from './infraestructuras/infraestructura.service';
import { InspeccionService } from './inspecciones/inspeccion.service';
import { ModalService } from './inspecciones/detalle/modal.service';

//material
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


registerLocaleData(localeES, 'es');

const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },

  {path: 'infraestructuras', component: InfraestructurasComponent},
  {path: 'infraestructuras/form-inf', component: FormInfraComponent},
  {path: 'infraestructuras/form-inf/:id', component: FormInfraComponent},

  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form-cli', component: FormCliComponent},
  {path: 'clientes/form-cli/:id', component: FormCliComponent},

  {path: 'usuarios', component: UsuariosComponent},
  {path: 'usuarios/form-usu', component: FormUsuComponent},
  {path: 'usuarios/form-usu/:id', component: FormUsuComponent},

  {path: 'inspecciones', component: InspeccionesComponent},
  {path: 'inspecciones/form-ins', component: FormInsComponent},
  {path: 'inspecciones/form-ins/:id', component: FormInsComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    ClientesComponent,
    UsuariosComponent,
    InfraestructurasComponent,
    InspeccionesComponent,
    FormCliComponent,
    FormUsuComponent,
    FormInsComponent,
    FormInfraComponent,
    DetalleComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPaginationModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [ClienteService, UsuarioService, InfraestructuraService, InspeccionService, ModalService,
    {provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
