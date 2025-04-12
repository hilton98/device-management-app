import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-main-menu',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent {

  constructor(
    private navigationService: NavigationService
  ) {}

  handleRedirectToDevices () {
    this.navigationService.goToDevices();
  }

  handleRedirectToCategories () {
    this.navigationService.goToCategories()
  }
}
