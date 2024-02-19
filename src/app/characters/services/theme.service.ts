import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _isDark = signal<boolean>(localStorage.getItem('theme') === 'true');
  public isDark = computed(() => this._isDark());

  public changeTheme(isDark: boolean): void {
    this._isDark.set(isDark);
    localStorage.setItem('theme', isDark.toString());
  }
}
