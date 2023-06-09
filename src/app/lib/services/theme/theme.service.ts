import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { DEFAULT_BASE_THEME } from '@lib/constants';
import { storage } from '@lib/utils';
import { BehaviorSubject, fromEventPattern, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppTheme } from './theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService implements OnDestroy {
  //#region attributes
  private _currentTheme$ = new BehaviorSubject<AppTheme | null>(this._storedTheme);
  currentTheme$ = this._currentTheme$.asObservable();

  private _destroy$ = new Subject<void>();
  private _mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //#endregion

  //#region accessors
  public get currentTheme(): AppTheme | null {
    return this._currentTheme$.getValue();
  }

  public get systemTheme(): AppTheme {
    return this._mediaQuery.matches ? 'dark' : 'light';
  }

  private get _storedTheme(): AppTheme | null {
    return storage.getItem('App/theme');
  }

  private set _storedTheme(theme: AppTheme | null) {
    storage.setItem('App/theme', theme as AppTheme);
  }
  //#endregion

  constructor(@Inject(DOCUMENT) private readonly _document: Document) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  init(): void {
    this.setTheme(this._storedTheme || DEFAULT_BASE_THEME);
    this._listenForMediaQueryChanges();
  }

  /**
   * Manually changes theme in LocalStorage & HTML body
   *
   * @param theme new theme
   */
  setTheme(theme: AppTheme): void {
    this._clearThemes();
    this._storedTheme = theme;

    let bodyClass = theme;
    this._currentTheme$.next(bodyClass);

    if (theme === 'system') {
      bodyClass = this.systemTheme;
    }
    this._document.body.classList.add(bodyClass);
  }

  /**
   * Handles system theme changes & applies theme automatically
   *
   */
  private _listenForMediaQueryChanges(): void {
    fromEventPattern<MediaQueryListEvent>(
      this._mediaQuery.addListener.bind(this._mediaQuery),
      this._mediaQuery.removeListener.bind(this._mediaQuery),
    )
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        // Only applies changes when the current theme is "system"
        if (this._storedTheme === 'system') {
          this.setTheme('system');
        }
      });
  }

  /**
   * Clears all themes in ThemeList enum from the HTML element
   *
   */
  private _clearThemes(): void {
    this._document.body.classList.remove('system', 'light', 'dark');
  }
}
