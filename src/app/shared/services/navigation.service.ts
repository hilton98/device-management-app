import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
  
export class NavigationService {
    constructor(
        private router: Router, 
    ) {}

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

    goToDevices () {
        this.router.navigate(['/devices'], {
            state: {
              dashboardName: 'Devices',
              devices: this.devices,
              isDevices: true
            }
        });
    }

    goToCategories () {
        this.router.navigate(['/categories'], {
          state: {
            dashboardName: 'Categories',
            categories: this.categories,
            isDevices: false
          }
        });
    }

    goToCreateCategory () {
      this.router.navigate(['/categories/new']);
    }

    goToCreateDevice () {
      this.router.navigate(['/devices/new'], {
        state: { categories: this.categories }
      });
    }

    goToMainMenu () {
      this.router.navigate(['']);
    }
}

