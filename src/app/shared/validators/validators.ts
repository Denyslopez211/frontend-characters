import { FormControl, ValidationErrors } from '@angular/forms';

export const isImagen = (control: FormControl): ValidationErrors | null => {
  const value: string = control.value;
  if (value) {
    const valueFormat = value.trim().toLowerCase();
    const extensionValida = /\.(png|jpg|jpeg|gif)$/i.test(valueFormat);
    return extensionValida ? null : { isNotImagen: true };
  }
  return null;
};
