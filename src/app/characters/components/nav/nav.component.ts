import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { ThemeService } from '@services/theme.service';
import { MenuItem } from '@interface/menu-item.interface';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  private themeService = inject(ThemeService);
  public isDark = computed(() => this.themeService.isDark());

  public menuItems = signal<MenuItem[]>([
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Agregar', icon: 'add', url: './new' },
  ]);

  public onChange(newValue: boolean): void {
    this.themeService.changeTheme(newValue);
  }
}
