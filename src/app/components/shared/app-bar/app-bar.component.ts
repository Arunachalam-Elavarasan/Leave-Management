import { Component } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../../environment/environment';
import { APP_BAR_MENU } from '../../../constants/contents';
import { AvatarComponent } from '../avatar/avatar.component';
import { RouterLink } from '@angular/router';
import { NavigationService } from '../../../services/navigation/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    AvatarComponent,
    CommonModule,
  ],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent {
  appName = environment?.APP_NAME;
  appBarMenu = APP_BAR_MENU;

  constructor(public navigation: NavigationService) {}
}
