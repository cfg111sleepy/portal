import { Injectable } from '@angular/core';
import { Theme, theme1, theme2 } from './themes';

@Injectable({
  providedIn: 'root'
})
export class ThemesServiceService {
  private active: Theme = theme1;
  private availableThemes: Theme[] = [theme1, theme2];
  private activeIndex: number = 0;

  changeActiveTheme(): void {
    this.activeIndex = (this.activeIndex + 1) % this.availableThemes.length;
    this.active = this.availableThemes[this.activeIndex];

    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
  
  setActiveTheme(name : string): void {
    this.activeIndex = this.availableThemes.findIndex(t=> t.name == name);
    this.active = this.availableThemes[this.activeIndex];

    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

}
