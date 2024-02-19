import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  inject,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TitleComponent } from '@shared/components/title/title.component';
import { Character } from '@interface/character.interface';
import { CardComponent } from '@components/card/card.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    TitleComponent,
    CardComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export default class SearchComponent {
  @Input({ required: true }) characters!: Character[];
  @Output()
  public onSearchCharacter: EventEmitter<Character[]> = new EventEmitter();
  public listCharacter: Character[] = this.characters;
  public selectedCharacter?: Character;

  public searchInput = new FormControl('');

  public searchCharacter(): void {
    const value: string = this.searchInput.value || '';
    const cleanValue: string = value.trim().toLowerCase();

    this.listCharacter = this.characters.filter((character: Character) =>
      character.name.toLowerCase().includes(cleanValue)
    );
    this.onSearchCharacter.emit(this.listCharacter);
  }
  public onBlur(): void {
    this.searchInput.reset();
  }
}
