import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme.directive';
import { ThemeOptions } from './theme-option';
import { ModuleWithProviders } from '@angular/core';
import { THEMES, ACTIVE_THEME, ThemeService } from 'src/app/theme';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemeDirective],
  exports: [ThemeDirective],
  providers: [ThemeService]
})
export class ThemeModule {
  static forRoot(option: ThemeOptions): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [
        {
          provide: THEMES,
          useValue: option.themes
        },
        {
          provide: ACTIVE_THEME,
          useValue: option.active
        }
      ]
    };
  }
}
