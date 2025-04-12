import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryCard } from '../../interfaces/category-card.interface';
import { Location } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-device-creation',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './device-creation.component.html',
})
export class DeviceCreationComponent implements OnInit {
  categories: CategoryCard[] = [];

  constructor(
    private location: Location,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    const navigation =  this.location.getState() as { categories?: CategoryCard[] };
    this.categories = navigation.categories || []; 
  }

  handleBackRedirect() {
    this.navigationService.goToDevices();
  }
}
