import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { TitleComponent } from '@shared/components/title/title.component';
import { CharacterService } from '@services/character.service';
import { Character } from '@interface/character.interface';
import { ImgPipe } from '@pipe/img.pipe';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { isImagen } from '@shared/validators/validators';

@Component({
  selector: 'app-new-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TitleComponent,
    ImgPipe,
  ],
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css',
})
export default class NewPageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private characterService = inject(CharacterService);

  public title = 'Agregar Personaje';

  public characterForm: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(30)],
    ],
    text: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300),
      ],
    ],
    img: ['', [isImagen]],
    cardId: [''],
    dbfId: [66224],
    cardSet: ['Tavern Brawl'],
    type: ['Spell'],
    cost: [10],
    playerClass: ['Neutral'],
    locale: ['esES'],
  });

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      this.title = 'Agregar Personaje';
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.characterService.getCharactersById(id)))
      .subscribe((character) => {
        if (!character) return this.router.navigateByUrl('/');
        this.characterForm.reset(character);
        this.title = `Editar personaje: ${character.name}`;
        return;
      });
  }

  get currentCharacter(): Character {
    const character = this.characterForm.value as Character;
    return character;
  }

  onSubmit(): void {
    this.characterForm.markAllAsTouched();
    if (this.characterForm.invalid) return;
    if (this.currentCharacter.cardId) {
      this.characterService
        .updateCharacter(this.currentCharacter)
        .subscribe((character) => {
          this.showSnackbar(`${character?.name} updated!`);
          this.router.navigate(['/character']);
        });
      return;
    }
    this.characterService
      .addCharacter(this.currentCharacter)
      .subscribe((character) => {
        this.showSnackbar(`${character?.name} created!`);
        this.router.navigate(['/character']);
      });
  }

  onCancel() {
    this.router.navigate(['/character']);
  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'Exitoso', {
      duration: 2500,
      panelClass: ['green-snackbar'],
    });
  }

  isValidField(field: string): boolean | null {
    return (
      this.characterForm.controls[field].errors &&
      this.characterForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.characterForm.controls[field]) return null;

    const errors = this.characterForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'maxLength':
          return `Máximo ${errors['maxLength'].requiredLength} caracteres.`;
        case 'isNotImagen':
          return `Debe ingresar la url de una imagen.`;
      }
    }

    return null;
  }
}
