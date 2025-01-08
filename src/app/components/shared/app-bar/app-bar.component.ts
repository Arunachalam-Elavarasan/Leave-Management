import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { APP_BAR_MENU } from '../../../constants/contents';
import { AvatarComponent } from '../avatar/avatar.component';
import { environment } from '../../../../environment/environment';
import { NavigationService } from '../../../services/navigation/navigation.service';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    AvatarComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent {
  appName = environment?.APP_NAME;
  appBarMenu = APP_BAR_MENU;

  constructor(public navigation: NavigationService) {}
}
