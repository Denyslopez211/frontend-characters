import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { NavComponent } from '@components/nav/nav.component';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, NavComponent],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css',
})
export default class LayoutPageComponent {}
