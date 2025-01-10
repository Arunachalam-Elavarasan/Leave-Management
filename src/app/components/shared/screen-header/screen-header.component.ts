import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'screen-header',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './screen-header.component.html',
  styleUrl: './screen-header.component.scss',
})
export class ScreenHeaderComponent {
  @Input() title: string = 'Title';
  @Input() hasAddBtn: boolean = true;
  @Input() canGoBack: boolean = false;
  @Input() addPath!: string;
  @Input() btnActions: any[] = [];
  @Output() onActionClick = new EventEmitter<any>();

  router = inject(Router);

  onActionBtnClick(action: string): void {
    if (action === 'add' && this.addPath) {
      this.router.navigate([this.addPath]);
      return;
    }
    this.onActionClick.emit(action);
  }
}
