import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CategoryCard } from '../interfaces/category-card.interface';
import { CategoryCardContentComponent } from './components/category-card-content/category-card-content.component';
import { DeviceCardContentComponent } from './components/device-card-content/device-card-content.component';
import { Location } from '@angular/common';
import { DeviceCard } from '../interfaces/device-card.interface';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';

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
  categories: CategoryCard[] = [];
  devices: DeviceCard[] = [];
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
      const navigation =  this.location.getState() as { categories?: CategoryCard[] };
      this.categories = navigation.categories || [];
    } else {
      const navigation =  this.location.getState() as { devices?: DeviceCard[] };
      this.devices = navigation.devices || [];
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
