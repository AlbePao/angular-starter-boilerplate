import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage {
  username = this._activatedRoute.snapshot.paramMap.get('username');

  constructor(private readonly _activatedRoute: ActivatedRoute) {}
}
