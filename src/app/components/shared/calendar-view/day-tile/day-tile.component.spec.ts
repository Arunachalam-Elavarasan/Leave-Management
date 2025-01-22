import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTileComponent } from './day-tile.component';

describe('DayTileComponent', () => {
  let component: DayTileComponent;
  let fixture: ComponentFixture<DayTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
