import { Component, inject, Input } from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { ContactInfoComponent } from '../contact-info/contact-info.component';
import { ToggleFieldComponent } from '../../../../components/shared/form-fields/toggle-field/toggle-field.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormGroupPipe } from '../../../../pipes/formGroup/form-group.pipe';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addUser } from '../../../../store/app/app.action';
import { NavigationService } from '../../../../services/navigation/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../services/api/api.service';

@Component({
  selector: 'basic-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TextFieldComponent,
    ToggleFieldComponent,
    ContactInfoComponent,
    FormGroupPipe,
    CommonModule,
  ],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss',
  providers: [FormBuilder],
})
export class BasicInfoComponent {
  private formBuilder = inject(FormBuilder);
  private store = inject(Store);
  private navigation = inject(NavigationService);
  private api = inject(ApiService);

  editId: any = '';
  isEdit: boolean = false;

  user = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    status: true,
    primaryContactInfo: this.formBuilder.group({
      address: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
    }),
    secondaryContactInfo: this.formBuilder.group({
      address: '',
      street: '',
      city: '',
      state: '',
      pinCode: '',
      sameAsPrimary: false,
    }),
  });

  ngOnInit(): void {
    const paramId = this.navigation.getQueryParam('id');
    const paramsIsEdit = this.navigation.getQueryParam('isEdit');

    paramId.subscribe((id) => {
      this.editId = id;
      if (id) {
        this.api.service.get(this.api.path.USERS, id).subscribe({
          next: (data) => {
            this.user.patchValue({ ...(data || {}) });
          },
          error: (err) => console.log(err),
        });
      }
    });

    paramsIsEdit.subscribe((editStatus) => {
      this.isEdit = editStatus === 'true';
    });
  }

  onSubmit() {
    this.store.dispatch(addUser({ value: this.user.value }));
  }
}
