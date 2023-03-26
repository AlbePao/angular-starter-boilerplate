import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppTheme, ThemeService } from '@lib/services/theme';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage {
  currentTheme$ = this._themeService.currentTheme$;

  constructor(private readonly _themeService: ThemeService) {}

  handleThemeChange(theme: AppTheme): void {
    this._themeService.setTheme(theme);
  }
}
