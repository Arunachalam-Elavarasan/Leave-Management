import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './app-menu.component.html',
  styleUrl: './app-menu.component.scss',
})
export class AppMenuComponent {
  @Input() label: string | undefined = 'Menu Name';
  @Input() menu: any = [];
  @Output() handleClick = new EventEmitter<any>();

  private router = inject(Router);

  onClick(item: any) {
    if (!item?.navigateTo) {
      this.handleClick.emit(item);
      return;
    }
    this.router.navigate([item?.navigateTo]);
  }
}
