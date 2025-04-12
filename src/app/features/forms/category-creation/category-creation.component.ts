import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NavigationService } from '../../../shared/services/navigation.service';

@Component({
  selector: 'app-category-creation',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './category-creation.component.html',
})
export class CategoryCreationComponent {
  
  constructor(
    private navigationService: NavigationService
  ) {}

  handleBackRedirect() {
    this.navigationService.goToCategories();
  }
}
