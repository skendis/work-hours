import {Component, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(private titleService: Title) {
    this.setTitle('מערכת שעות');
  }

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }
}
