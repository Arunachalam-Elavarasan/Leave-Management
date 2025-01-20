import { Routes } from '@angular/router';

import { LayoutComponent } from './components/wrappers/layout/layout.component';

import { routePath } from './constants/route';
import { authGuard } from './components/wrappers/authGuard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: routePath?.HOME,
        pathMatch: 'full',
      },
      {
        path: routePath?.HOME,
        loadComponent: () =>
          import('./pages/user/list/list.component').then(
            (m) => m.ListComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: routePath?.USER_FORM,
        loadComponent: () =>
          import('./pages/user/form/basic-info/basic-info.component').then(
            (m) => m.BasicInfoComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: `${routePath?.USER_FORM}/:action/:id`,
        loadComponent: () =>
          import('./pages/user/form/basic-info/basic-info.component').then(
            (m) => m.BasicInfoComponent
          ),
        canActivate: [authGuard],
      },

      {
        path: routePath?.LEAVE_LIST,
        loadComponent: () =>
          import('./pages/leave/list/list.component').then(
            (m) => m.ListComponent
          ),
        canActivate: [authGuard],
        children: [
          {
            path: '',
            redirectTo: 'calender-view',
            pathMatch: 'full',
          },
          {
            path: 'calender-view',
            loadComponent: () =>
              import(
                './pages/leave/list/view/calender/calender.component'
              ).then((m) => m.CalenderComponent),
          },
          {
            path: 'card-view',
            loadComponent: () =>
              import('./pages/leave/list/view/card/card.component').then(
                (m) => m.CardComponent
              ),
          },
        ],
      },

      {
        path: `${routePath?.LEAVE_FORM}/:id`,
        loadComponent: () =>
          import('./pages/leave/form/form.component').then(
            (m) => m.FormComponent
          ),
      },
    ],
  },
];
