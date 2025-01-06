import { Component, inject } from '@angular/core';
import { ScreenHeaderComponent } from '../../../components/shared/screen-header/screen-header.component';
import { Store } from '@ngrx/store';
import { getLeaveDetails } from '../../../store/app/app.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'leave-list',
  standalone: true,
  imports: [ScreenHeaderComponent, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private store = inject(Store);
  leaveDetails: any = [];

  ngOnInit(): void {
    this.store.subscribe({
      next: (state) => {
        this.leaveDetails = state?.app?.leaveDetails || [];
      },
    });
  }
}
