import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'user-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  constructor(private route: Router) {}

  onClick() {
    this.route.navigate(['user/form']);
  }
}
