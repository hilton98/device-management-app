import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CategoryCardContentComponent } from './components/category-card-content/category-card-content.component';
import { DeviceCardContentComponent } from './components/device-card-content/device-card-content.component';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NavigationService } from '../services/navigation.service';
import { DeviceList } from '../../shared/models/device.model';
import { CategoryList } from '../../shared/models/category.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    CategoryCardContentComponent,
    DeviceCardContentComponent,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dashboardName: string = '';
  categories!: CategoryList;
  devices!: DeviceList;
  isDevices: boolean = false;

  constructor(
    private location: Location,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    const dashState = this.location.getState() as { dashboardName : string,  isDevices: boolean }
    this.isDevices = dashState.isDevices;
    this.dashboardName = dashState.dashboardName;
  
    if (!this.isDevices) {
      const navigation =  this.location.getState() as { categories?: CategoryList };
      this.categories = navigation.categories as CategoryList;
    } else {
      const navigation =  this.location.getState() as { devices?: DeviceList };
      this.devices = navigation.devices as DeviceList;
    } 
  }

  handleRedirectToCreate () {
    if (this.isDevices) {
      this.navigationService.goToCreateDevice();
    } else {
      this.navigationService.goToCreateCategory();
    }
  }

  handleBackRedirect() {
    this.navigationService.goToMainMenu();
  }
}
