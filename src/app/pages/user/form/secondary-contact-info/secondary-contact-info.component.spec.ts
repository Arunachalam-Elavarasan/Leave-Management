import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryContactInfoComponent } from './secondary-contact-info.component';

describe('SecondaryContactInfoComponent', () => {
  let component: SecondaryContactInfoComponent;
  let fixture: ComponentFixture<SecondaryContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryContactInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
