import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NavigationService } from '../../services/navigation.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateCategoryService } from '../../services/category/create-category.service';

@Component({
  selector: 'app-category-creation',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './category-creation.component.html',
})
export class CategoryCreationComponent {
  form: FormGroup;
  isShowMessage = false;
  message = '';
  
  constructor(
    private navigationService: NavigationService,
    private createCategoryService: CreateCategoryService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group(
      {
        name: [
          '',
          Validators.maxLength(128)
        ],
      }, 
      {}
    );
  }

  handleSubmit() {
    if (this.form.valid) {
      const categoryPayload = this.form.value;

      this.createCategoryService.execute(categoryPayload).subscribe({
        next: () => {
          this.navigationService.goToCategories();
        },
        error: (error) => {
          if (error.status === 409) {
            this.showMessage('The new category already exists!');
          } else {
            this.showMessage('Error creating category. Please try again.');
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

  handleBackRedirect() {
    this.navigationService.goToCategories();
  }
}
