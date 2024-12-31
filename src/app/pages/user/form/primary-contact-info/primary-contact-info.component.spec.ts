import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryContactInfoComponent } from './primary-contact-info.component';

describe('PrimaryContactInfoComponent', () => {
  let component: PrimaryContactInfoComponent;
  let fixture: ComponentFixture<PrimaryContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryContactInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaryContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
