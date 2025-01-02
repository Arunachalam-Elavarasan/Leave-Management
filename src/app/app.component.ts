import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api/api.service';
import { Store } from '@ngrx/store';
import { addUsers } from './store/app/app.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private api = inject(ApiService);
  private store = inject(Store);

  ngOnInit(): void {
    this.api.service.get(this.api.path.USERS).subscribe({
      next: (value: any) => {
        this.store.dispatch(addUsers({ value }));
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
