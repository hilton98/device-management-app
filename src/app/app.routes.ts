import { Routes } from '@angular/router';
import { MainMenuComponent } from './features/main-menu/main-menu.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CategoryCreationComponent } from './features/forms/category-creation/category-creation.component';
import { DeviceCreationComponent } from './features/forms/device-creation/device-creation.component';

export const routes: Routes = [
    { path: '', component: MainMenuComponent },
    { path: 'devices', component: DashboardComponent },
    { path: 'devices/new', component: DeviceCreationComponent },
    { path: 'categories', component: DashboardComponent },
    { path: 'categories/new', component: CategoryCreationComponent },
    { path: '**', component: MainMenuComponent }
];

