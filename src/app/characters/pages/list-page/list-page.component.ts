import { Component, computed, effect, inject } from '@angular/core';
import { CharacterService } from '@services/character.service';
import { MatDividerModule } from '@angular/material/divider';

import { CardComponent } from '@components/card/card.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { TitleComponent } from '@shared/components/title/title.component';
import SearchComponent from '@components/search-page/search.component';
import { Character } from '@interface/character.interface';

@Component({
  selector: 'app-list-page',
  standalone: true,
  imports: [
    MatDividerModule,
    CardComponent,
    SpinnerComponent,
    SearchComponent,
    TitleComponent,
  ],
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export default class ListPageComponent {
  private characterService = inject(CharacterService);

  public characterExist = computed(() =>
    this.characterService.characterExist()
  );
  public characters = computed(() => this.characterService.characters());
  public listCharacter: Character[] = this.characters();

  ngOnInit(): void {
    if (!this.characterExist()) {
      this.getCharacters();
    }
  }

  getCharacters() {
    this.characterService.getCharacters();
  }

  onSearch(character: Character[]): void {
    this.listCharacter = character;
  }

  public searchEffect = effect(() => {
    this.listCharacter = this.characters();
  });
}
