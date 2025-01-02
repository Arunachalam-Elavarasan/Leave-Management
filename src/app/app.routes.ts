import { Routes } from '@angular/router';

import { LayoutComponent } from './components/wrappers/layout/layout.component';

import { routePath } from './constants/route';

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
      },
      {
        path: routePath?.USER_FORM,
        loadComponent: () =>
          import('./pages/user/form/basic-info/basic-info.component').then(
            (m) => m.BasicInfoComponent
          ),
      },

      {
        path: routePath?.LEAVE_LIST,
        loadComponent: () =>
          import('./pages/leave/list/list.component').then(
            (m) => m.ListComponent
          ),
      },
      {
        path: routePath?.LEAVE_FORM,
        loadComponent: () =>
          import('./pages/leave/form/form.component').then(
            (m) => m.FormComponent
          ),
      },
    ],
  },
];
