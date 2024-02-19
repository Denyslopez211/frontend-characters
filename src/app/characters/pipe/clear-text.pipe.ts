import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'cleartext',
})
export class ClearTextPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return 'No tiene texto';
    return value.replace(/\[x\]/g, '').replace(/\\n/g, '<br />');
  }
}
