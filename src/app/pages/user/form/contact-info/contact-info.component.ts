import { Component, Input } from '@angular/core';
import { TextFieldComponent } from '../../../../components/shared/form-fields/text-field/text-field.component';
import { CommonModule } from '@angular/common';
import { CheckBoxFieldComponent } from '../../../../components/shared/form-fields/check-box-field/check-box-field.component';
import { FormControl,  FormGroup,  FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'contact-info',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TextFieldComponent,
    CheckBoxFieldComponent,
  ],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
})
export class ContactInfoComponent {
  @Input() isPrimaryInfo: boolean = true;
  @Input() contactInfoValue!: FormGroup;

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.contactInfoValue);
    
  }
}
