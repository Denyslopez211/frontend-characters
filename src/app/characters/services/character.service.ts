import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { environment } from '@environments/environments';
import { Character } from '@interface/character.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private http = inject(HttpClient);

  private url: string = environment.baseUrl;
  private _characterExist = signal<boolean>(false);
  private _characters = signal<Character[]>([]);

  public characters = computed(() => this._characters());
  public characterExist = computed(() => this._characterExist());

  public loadCharacterApi(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.url}/cards/sets/Battlegrounds`, {
      params: {
        attack: '1',
        locale: 'esES',
        // cost: '10',
      },
    });
  }

  public getCharacters(isAuto = false): void {
    this._characterExist.set(false);
    const dataLocal = this.getCharacterLocal();
    if (!dataLocal || isAuto) {
      this.getCharacterApi();
    } else {
      this.saveResponse(dataLocal);
    }
  }

  private getCharacterApi(): void {
    this.loadCharacterApi().subscribe({
      next: (character: Character[]) => this.saveResponse(character),
      error: () => this._characterExist.set(false),
    });
  }

  private getCharacterLocal(): Character[] | undefined {
    const dataLocal = localStorage.getItem('characters');
    return dataLocal && dataLocal !== '[]' ? JSON.parse(dataLocal) : undefined;
  }

  private saveResponse(character: Character[]): void {
    this._characters.set(character);
    this._characterExist.set(true);
  }

  public getCharactersById(cardId: string): Observable<Character | undefined> {
    const character = this.characters().find((c) => c.cardId === cardId);
    return of(character);
  }

  public addCharacter(
    newCharacter: Character
  ): Observable<Character | undefined> {
    const existCharacter = this.characters().find(
      (c) => c.name === newCharacter.name
    );
    if (existCharacter) return of(undefined);

    newCharacter.cardId = uuidv4();
    this._characters.update((character) => [newCharacter, ...character]);
    return of(newCharacter);
  }

  public deleteCharacter(IdCharacter: string): void {
    this._characters.update((currenCharacter) =>
      currenCharacter.filter((c) => c.cardId != IdCharacter)
    );
    if (!this._characters().length) {
      this.getCharacters(true);
    }
  }

  public updateCharacter(
    newCharacter: Character
  ): Observable<Character | undefined> {
    this._characters.update((current) => {
      return current.map((character) => {
        if (character.cardId === newCharacter.cardId) {
          return { ...character, ...newCharacter };
        }
        return character;
      });
    });
    return of(newCharacter);
  }

  public charactersEffect = effect(() => {
    if (this.characterExist()) {
      localStorage.setItem('characters', JSON.stringify(this.characters()));
    }
  });
}
