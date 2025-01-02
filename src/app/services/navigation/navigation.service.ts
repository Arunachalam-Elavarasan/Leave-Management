import { inject, Injectable } from '@angular/core';
import { routePath } from '../../constants/route';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private route = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  path = routePath;
  params: any = '';

  navigateTo(path: string, queryParams?: any) {
    this.route.navigate([path], { queryParams });
  }
}
