import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryCard } from '../../interfaces/category-card.interface';
import { Location } from '@angular/common';
import { NavigationService } from '../../services/navigation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateDeviceService } from '../../services/device/create-device.service';

@Component({
  selector: 'app-device-creation',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './device-creation.component.html',
})
export class DeviceCreationComponent implements OnInit {
  form: FormGroup;
  categories: CategoryCard[] = [];
  isCategoryDefined = true;

  constructor(
    private location: Location,
    private navigationService: NavigationService,
    private createDeviceService: CreateDeviceService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      categoryId: [null],
      categoryName: [
        null, 
        Validators.maxLength(128)
      ],
      color: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
        ])
      ],
      partNumber: [
        '', 
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/)
        ])
      ],
    }, {
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      const devicePayload = this.form.value;
      
      this.isCategoryDefined = (
        (devicePayload.categoryId && !devicePayload.categoryName) || 
        (!devicePayload.categoryId && devicePayload.categoryName)
      )

      if (!this.isCategoryDefined) {
        return;
      }

      this.createDeviceService.execute(devicePayload).subscribe({
        next: () => {
          this.navigationService.goToDevices()
        },
        error: (error) => {
          console.error('Error create device', error);
        }
      })
    }
  }

  ngOnInit(): void {
    const navigation =  this.location.getState() as { categories?: CategoryCard[] };
    this.categories = navigation.categories || []; 
  }

  handleBackRedirect() {
    this.navigationService.goToDevices();
  }
}
