import { Component, OnInit } from '@angular/core';
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
import { CategoryList } from '../../../shared/models/category.model';

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
  isShowMessage = false;
  message = '';

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
          Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/),
          Validators.maxLength(16)
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
      
      const isCategoryDefined = (
        (devicePayload.categoryId && !devicePayload.categoryName) || 
        (!devicePayload.categoryId && devicePayload.categoryName)
      )

      if (!isCategoryDefined) {
        this.showMessage('Define a new category or select an existing one!')
        return;
      }

      this.createDeviceService.execute(devicePayload).subscribe({
        next: () => {
          this.navigationService.goToDevices()
        },
        error: (error) => {
          if (error.status === 409) {
            this.showMessage('The new category already exists!');
          } else {
            this.showMessage('Error creating device. Please try again.')
          }
        }
      })
    }
  }

  showMessage(message: string) {
    this.message = message;
    this.isShowMessage = true;
    setTimeout(() => this.isShowMessage = false, 3000);
  }

  ngOnInit(): void {
    const navigation =  this.location.getState() as { categories?: CategoryList };
    this.categories = navigation.categories?.categories || []; 
  }

  handleBackRedirect() {
    this.navigationService.goToDevices();
  }
}
