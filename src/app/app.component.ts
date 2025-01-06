import { Store } from '@ngrx/store';
import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';

import { loadLeaveDetails, loadUsers } from './store/app/app.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadLeaveDetails());
  }
}
