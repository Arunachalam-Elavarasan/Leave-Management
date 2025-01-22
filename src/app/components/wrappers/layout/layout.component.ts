import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppBarComponent } from '../../shared/app-bar/app-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, AppBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
