import { Component, inject } from '@angular/core';
import { ScreenHeaderComponent } from '../../../components/shared/screen-header/screen-header.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { getLeaves, getUsers } from '../../../store/app/app.selector';
import { SelectFieldComponent } from '../../../components/shared/form-fields/select-field/select-field.component';

@Component({
  selector: 'leave-list',
  standalone: true,
  imports: [ScreenHeaderComponent, CommonModule, SelectFieldComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private store = inject(Store);
  leaveDetails: any = [];
  users: any[] = [];

  onUserSelect(value: any) {
    console.log(value);
  }

  getLeaveDetails() {
    this.store.select(getLeaves).subscribe({
      next: (leaves: any[]) => {
        let userNames: any = {};
        this.leaveDetails = this.leaveDetails = leaves?.reduce(
          (acc: any[], leave: any) => {
            if (!leave?.userId) return acc;
            let existName: string = userNames?.[leave?.userId] || '';
            if (!existName) {
              const user = this.users?.find(
                (item) => item?.id === leave?.userId
              );
              existName = `${user?.firstName} ${user?.lastName}`;
              userNames[user?.id] = existName;
            }

            acc.push({ ...leave, userName: existName });

            return acc;
          },
          []
        );
      },
    });
  }

  ngOnInit(): void {
    this.store.select(getUsers).subscribe({
      next: (userDetails) => {
        this.users = userDetails;
        this.getLeaveDetails();
      },
    });
  }
}
