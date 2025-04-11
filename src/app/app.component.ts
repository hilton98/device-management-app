import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { MainMenuComponent } from './features/main-menu/main-menu.component';
// import { CategoryCreationComponent } from './features/forms/category-creation/category-creation.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    // MainMenuComponent,
    // CategoryCreationComponent,
    DashboardComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'device-management-app';

  categories = [
    {
      id: 21,
      name: "Home"
    },
    {
      id: 22,
      name: "Work"
    },
  ]

  devices = [
    {
      id: 666,
      color: 'blue',
      categoryName: 'Shirt',
      partNumber: 7548,
    },
    {
      id: 667,
      color: 'blue',
      categoryName: 'Pants',
      partNumber: 7514,
    },
    {
      id: 668,
      color: 'cyan',
      categoryName: 'Sports',
      partNumber: 4514,
    }

  ]
}
