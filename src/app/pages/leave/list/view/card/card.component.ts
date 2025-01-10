import { Component, inject } from '@angular/core';
import { getLeaves, getUsers } from '../../../../../store/app/app.selector';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private store = inject(Store);
  leaveDetails: any = [];
  users: any[] = [];

  filteredDetails: any[] = [];

  onChange(value: any) {
    if (!value) this.filteredDetails = this.leaveDetails;
  }

  onUserSelect(value: any) {
    if (!value) {
      this.filteredDetails = this.leaveDetails;
      return;
    }
    this.filteredDetails = this.leaveDetails?.filter(
      (leave: any) => leave?.userId === value?.id
    );
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
              if (!user) return acc;

              existName = `${user?.firstName} ${user?.lastName}`;
              userNames[user?.id] = existName;
            }
            acc.push({ ...leave, userName: existName });
            return acc;
          },
          []
        );

        this.filteredDetails = this.leaveDetails;
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
