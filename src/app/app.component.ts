import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';

import { LoaderComponent } from './components/shared/loader/loader.component';

import { getLoader } from './store/app/app.selector';
import { AuthService } from './services/auth/auth.service';
import { loadLeaveDetails, loadUsers } from './store/app/app.action';
import { ThemeService } from './services/theme/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private store = inject(Store);
  private auth = inject(AuthService);
  private theme = inject(ThemeService);
  isLoading: boolean = false;

  ngOnInit(): void {
    this.theme.applyStoredTheme();
    this.auth.setIsLoggedIn(true);
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadLeaveDetails());
    this.store.select(getLoader).subscribe((loadState) => {
      this.isLoading = loadState;
    });
  }
}
