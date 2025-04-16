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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { CategoryList } from '../../../../shared/models/category.model';

@Component({
  selector: 'app-category-card-content',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatPaginatorModule
  ],
  templateUrl: './category-card-content.component.html',
})
export class CategoryCardContentComponent implements OnChanges {
  
  @Input() categories!: CategoryList;
  categoryList: CategoryCard[] = [];
  form: FormGroup;
  pageSizeOptions= [5, 10, 50, 100]
  pageSize = 10;
  items = 0;
  page = 0;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories']) {
      const { categories, total } = this.categories;
      this.categoryList = categories;
      this.items = total;
    }
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
    const currentPage = this.page + 1;
    this.getCategoriesService.execute( { page: currentPage, itemsPerPage: this.pageSize } ).subscribe({
      next: (data) => {
        const {categories, total} = data;
        this.categoryList = categories;
        this.items = total;
      },
      error: (error) => {
        console.error('Error to load categories', error);
      }
    });
  }

  async onPageFired(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDevices();
  }

}
