import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';

import { loadLeaveDetails, loadUsers } from './store/app/app.action';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { getLoader } from './store/app/app.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private store = inject(Store);
  isLoading: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadLeaveDetails());
    this.store.select(getLoader).subscribe((loadState) => {
      this.isLoading = loadState;
    });
  }
}
