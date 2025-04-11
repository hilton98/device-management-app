import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CategoryCard } from '../interfaces/category-card.interface';
import { DeviceCard } from '../interfaces/device-card.interface';
import { CategoryCardContentComponent } from './components/category-card-content/category-card-content.component';
import { DeviceCardContentComponent } from './components/device-card-content/device-card-content.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    CategoryCardContentComponent,
    DeviceCardContentComponent
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  @Input() dashboardName: string = '';
  @Input() categories: CategoryCard[] = [];
  @Input() devices: DeviceCard[] = [];
  @Input() isDevices: boolean = false;
}
