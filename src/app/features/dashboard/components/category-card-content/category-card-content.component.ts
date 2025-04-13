import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CategoryCard } from '../../../interfaces/category-card.interface';
import { DeleteCategoryService } from '../../../services/category/delete-category.service';
import { GetCategoriesService } from '../../../services/category/get-categories.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetCategoryByIdService } from '../../../services/category/get-category-by-id.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category-card-content',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './category-card-content.component.html',
})
export class CategoryCardContentComponent implements OnChanges {
  
  @Input() categories: CategoryCard[] = [];
  categoryList: CategoryCard[] = [];
  form: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories']) {
      this.categoryList = [...this.categories];
    }
  }

  constructor(
    private deleteCategoryService: DeleteCategoryService,
    private getCategoriesService: GetCategoriesService,
    private getCategoryByIdService: GetCategoryByIdService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group(
      {
        id: [
          '',
          Validators.pattern(/^[0-9]+$/)
        ],
      }, {}
    );
  }

  handleFindCategoryById() {
    if (this.form.valid) {
      const categoryId = this.form.value.id;
      this.getCategoryByIdService.execute(categoryId).subscribe(
        {
          next: (data) => {
            this.categoryList = [data];
          },
          error: (error) => {
            console.error('Error to find category', error)
          }
        }
      )
    }
  }

  handleDeleteDevice (id: number) {
    this.deleteCategoryService.execute(id).subscribe({
      next: () => {
        this.loadDevices()
      },
      error: (error) => {
        console.error('Error to delete category', error)
      }
    })
  }

  loadDevices() {
    this.getCategoriesService.execute().subscribe({
      next: (data) => {
        this.categoryList = data;
      },
      error: (error) => {
        console.error('Error to load categories', error);
      }
    });
  }

}
