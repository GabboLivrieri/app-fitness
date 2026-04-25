import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calories'
})
export class CaloriesPipe implements PipeTransform {

  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return ' ~0 kcal';
    }

    return ` ~${value} kcal`;
  }
}