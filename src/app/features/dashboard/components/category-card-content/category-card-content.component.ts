import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CategoryCard } from '../../../interfaces/category-card.interface';

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
export class CategoryCardContentComponent {
  @Input() categories!: CategoryCard[]; 
}
