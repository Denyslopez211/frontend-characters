import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'img',
})
export class ImgPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return 'assets/no-image.png';
    return value;
  }
}
