export interface Character {
  cardId: string;
  dbfId: number;
  name: string;
  cardSet: CardSet;
  type: Type;
  cost: number;
  attack: number;
  health: number;
  text?: string;
  race?: string;
  playerClass: PlayerClass;
  locale: Locale;
  artist?: string;
  elite?: boolean;
  img?: string;
  mechanics?: Mechanic[];
  otherRaces?: string[];
  faction?: string;
  rarity?: string;
  imgGold?: string;
  flavor?: string;
}

export enum CardSet {
  Battlegrounds = 'Battlegrounds',
}

export enum Locale {
  EsES = 'esES',
}

export interface Mechanic {
  name: string;
}

export enum PlayerClass {
  Neutral = 'Neutral',
  Rogue = 'Rogue',
  Warlock = 'Warlock',
}

export enum Type {
  Minion = 'Minion',
}
