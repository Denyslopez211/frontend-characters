import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { ClearTextPipe } from '@pipe/clear-text.pipe';
import { Character } from '@interface/character.interface';
import { ImgPipe } from '@pipe/img.pipe';
import { CharacterService } from '@services/character.service';
import { DialogComponent } from '@shared/components/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ClearTextPipe,
    ImgPipe,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) character!: Character;

  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);
  private characterService = inject(CharacterService);

  onDeleteCharacter(character: Character) {
    if (!character.cardId) throw Error('Character id is required');
    const dialogRef = this.dialog.open(DialogComponent, {
      data: character,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.characterService.deleteCharacter(character.cardId);
      this.showSnackbar(`${character?.name} deleted!`);
    });
  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'Exitoso', {
      duration: 2500,
      panelClass: ['green-snackbar'],
    });
  }
}
