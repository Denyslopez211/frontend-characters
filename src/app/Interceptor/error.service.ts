import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private snackbar = inject(MatSnackBar);

  messageError(err: HttpErrorResponse) {
    let errorMessage = this.getErrorMessage(err);
    this.showSnackbar(errorMessage);
    return throwError(() => errorMessage);
  }

  private getErrorMessage(err: HttpErrorResponse): string {
    if (err.status === 0) {
      return 'The server is not available or cannot be accessed';
    }
    if (err.status === 401 || err.error.message) {
      return err.error.message || 'Unauthorized';
    }
    return err.message || 'An error occurred';
  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'Error', {
      duration: 5000,
      panelClass: ['red-snackbar'],
    });
  }
}
