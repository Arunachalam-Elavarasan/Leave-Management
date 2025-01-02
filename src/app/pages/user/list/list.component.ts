import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api/api.service';
import { Store } from '@ngrx/store';
import { addUsers } from '../../../store/app/app.action';
import { Users } from '../../../model/users';
import { AppTableComponent } from '../../../components/shared/app-table/app-table.component';
import { NavigationService } from '../../../services/navigation/navigation.service';

const tableColumn = [
  {
    label: 'First Name',
    accessor: 'firstName',
  },
  {
    label: 'Last Name',
    accessor: 'lastName',
  },
  {
    label: 'Mobile No',
    accessor: 'mobileNo',
  },
  {
    label: 'Email',
    accessor: 'email',
  },
];

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [AppTableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private route = inject(Router);
  private api = inject(ApiService);
  private store = inject(Store);
  private navigation = inject(NavigationService);

  columnData = tableColumn;

  users: any[] = [];

  ngOnInit(): void {
    this.store.subscribe({
      next: (value: any) => {
        console.log(value?.app?.users);
        this.users = [...(value?.app?.users || [])];
      },
    });
  }

  onActionClick(values: any) {
    if (values?.action === 'delete') {
      return;
    }
    this.navigation.navigateTo(this.navigation.path.USER_FORM, {
      id: values?.item?.id,
      isEdit: values?.action === 'edit',
    });
  }
}
