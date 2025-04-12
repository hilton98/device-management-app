import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DeviceCardMapper } from "../mappers/device-card.mapper";
import { GetCategoriesService } from "./category/get-categories.service";
import { GetDevicesService } from "./device/get-devices.service";

@Injectable({
    providedIn: 'root',
})
  
export class NavigationService {
    constructor(
        private router: Router,
        private getCategoriesService: GetCategoriesService,
        private getDevicesService: GetDevicesService,
        private deviceCardMapper: DeviceCardMapper
    ) {}

    goToDevices () {
      this.getDevicesService.execute().subscribe({
        next: (data) => {
          this.router.navigate(['/devices'], {
            state: {
              dashboardName: 'Devices',
              devices: this.deviceCardMapper.mapMany(data),
              isDevices: true
            }
          });
        },
        error: (error) => {
          console.error('Error fetching categories', error);
        }
      })
    }

    goToCategories () {
      this.getCategoriesService.execute().subscribe({
        next: (data) => {
          this.router.navigate(['/categories'], {
            state: {
              dashboardName: 'Categories',
              categories: data,
              isDevices: false
            }
          });
        },
        error: (error) => {
          console.error('Error fetching categories', error);
        },
      });
    }

    goToCreateCategory () {
      this.router.navigate(['/categories/new']);
    }

    goToCreateDevice () {
      this.getCategoriesService.execute().subscribe({
        next: (data) => {
          this.router.navigate(['/devices/new'], {
            state: { categories: data }
          });
        },
        error: (error) => {
          console.error('Error fetching categories', error);
        },
      });
    }

    goToMainMenu () {
      this.router.navigate(['']);
    }
}

