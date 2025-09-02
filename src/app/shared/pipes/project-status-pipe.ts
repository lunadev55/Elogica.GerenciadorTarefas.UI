import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectStatus',
})
export class ProjectStatusPipe implements PipeTransform {
  transform(value: string | number): string {
    
    if (value === undefined || value === null) {
      return 'Unknown';
    }

    if (typeof value === 'string') {
      switch (value) {
        case 'NotStarted':
          return 'Não Iniciado';
        case 'InProgress':
          return 'Em Andamento';
        case 'OnHold':
          return 'Em Espera';
        case 'Completed':
          return 'Concluído';
        case 'Cancelled':
          return 'Cancelado';
        default:
          return value;
      }
    }

    return 'Desconhecido';
  }
}