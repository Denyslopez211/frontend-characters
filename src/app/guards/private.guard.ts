import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CharacterService } from '@services/character.service';

export const PrivateGuard: CanActivateFn = (route, state) => {
  const characterService = inject(CharacterService);
  const router = inject(Router);
  if (characterService.characterExist()) {
    return true;
  }

  router.navigateByUrl('/character');
  return false;
};
