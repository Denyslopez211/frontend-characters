import { Routes } from '@angular/router';

import { Error404PageComponent } from '@shared/pages/error404-page/error404-page.component';
import { PrivateGuard } from './guards/private.guard';

export const routes: Routes = [
  {
    path: 'character',
    loadComponent: () =>
      import('./characters/pages/layout-page/layout-page.component'),
    children: [
      {
        path: 'new',
        title: 'New Character',
        loadComponent: () =>
          import('./characters/pages/new-page/new-page.component'),
        canActivate: [PrivateGuard],
      },
      {
        path: 'edit/:id',
        title: 'Edit Character',
        loadComponent: () =>
          import('./characters/pages/new-page/new-page.component'),
        canActivate: [PrivateGuard],
      },
      {
        path: 'list',
        title: 'List Character',
        loadComponent: () =>
          import('./characters/pages/list-page/list-page.component'),
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'character',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
