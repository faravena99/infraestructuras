import { TipoEstructura } from '../infraestructuras/tipoEstructura';
import { Cliente } from '../clientes/cliente';
import { Fotografia } from './detalle/fotografia';

export class Inspeccion {
    id: number;
    cliente: Cliente;
    tipoEstructura: TipoEstructura;
    fotografia: Fotografia;

    nombreEstructura: string;
    fechaInspeccion: Date;
    descripcion: string;
    foto: string;

}
