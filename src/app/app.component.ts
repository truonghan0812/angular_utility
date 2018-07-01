import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from './theme';
import { THEMES } from 'src/app/theme';
enum Themes {
  ORANGE = 'orange',
  PURPLE = 'purple'
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  buttonTextContent = `Switch to ${Themes.PURPLE}`;
  title = 'app';
  constructor(private themeService: ThemeService) {}
  switch() {
    let switchButton = event.target || event.srcElement || event.currentTarget;
    const activeTheme = this.themeService.getActiveTheme();
    if (activeTheme.name === Themes.ORANGE) {
      this.themeService.setTheme(Themes.PURPLE);
      this.buttonTextContent = `Switch to ${Themes.ORANGE}`;
    } else {
      this.themeService.setTheme(Themes.ORANGE);
      this.buttonTextContent = `Switch to ${Themes.PURPLE}`;
    }
  }
}
