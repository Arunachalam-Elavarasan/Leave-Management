import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ScreenHeaderComponent } from '../../../components/shared/screen-header/screen-header.component';
import { SelectFieldComponent } from '../../../components/shared/form-fields/select-field/select-field.component';

import { getLeaves, getUsers } from '../../../store/app/app.selector';
import { RouterLink, RouterOutlet } from '@angular/router';
import { routePath } from '../../../constants/route';
import { ShareDataService } from '../../../services/shareDate/share-data.service';

@Component({
  selector: 'leave-list',
  standalone: true,
  imports: [
    ScreenHeaderComponent,
    CommonModule,
    SelectFieldComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  providers: [ShareDataService],
})
export class ListComponent {
  private store = inject(Store);
  sharedData = inject(ShareDataService);
  leaveDetails: any = [];
  users: any[] = [];

  route = routePath;

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
        this.sharedData.setData(this.leaveDetails);
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
