import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { APP_BAR_MENU } from '../../../constants/contents';
import { AvatarComponent } from '../avatar/avatar.component';
import { environment } from '../../../../environment/environment';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../../services/theme/theme.service';
import { AppMenuComponent } from '../app-menu/app-menu.component';

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
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    AppMenuComponent,
  ],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent {
  appName = environment?.APP_NAME;
  appBarMenu = APP_BAR_MENU;
  theme = inject(ThemeService);
}
