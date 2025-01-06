import { inject, Injectable } from '@angular/core';
import { routePath } from '../../constants/route';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  path = routePath;

  activeLink = this.route.url;

  navigateTo(path: string, queryParams?: any) {
    this.route.navigate([path], { queryParams });
  }

  getQueryParam(queryKey: string) {
    return this.activatedRoute.queryParamMap.pipe(
      map((params: ParamMap) => params.get(queryKey))
    );
  }
}
