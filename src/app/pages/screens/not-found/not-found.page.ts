import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.css'],
})
export class NotFoundPage {}
