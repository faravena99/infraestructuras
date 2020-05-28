import { Region } from './region';
import { Visita } from './visita';
import { TipoEstructura } from './tipoEstructura';
import { Cliente } from '../clientes/cliente';
import { Provincia } from './provincia';


export class Infraestructura {
    id: number;
    tramo: string;
    nombreEstructura: string;
    kilometro: string;
    region: Region;
    visita: Visita;
    tipoEstructura: TipoEstructura;
    cliente: Cliente;
    provincia: Provincia;

}
