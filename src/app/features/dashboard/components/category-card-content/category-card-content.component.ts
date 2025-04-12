import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CategoryCard } from '../../../interfaces/category-card.interface';
import { DeleteCategoryService } from '../../../services/category/delete-category.service';
import { GetCategoriesService } from '../../../services/category/get-categories.service';

@Component({
  selector: 'app-category-card-content',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './category-card-content.component.html',
})
export class CategoryCardContentComponent implements OnChanges {
  
  @Input() categories: CategoryCard[] = [];

  categoryList: CategoryCard[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories']) {
      this.categoryList = [...this.categories];
    }
  }

  constructor(
    private deleteCategoryService: DeleteCategoryService,
    private getCategoriesService: GetCategoriesService
  ) {}

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
