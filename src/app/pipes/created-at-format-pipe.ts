import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createdAtFormat',
})
export class CreatedAtFormatPipe implements PipeTransform {

  transform(value: number | Date): string {
    if (!value) return '';

    const date = new Date(value);

    return new Intl.DateTimeFormat('it-IT', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  }
}
