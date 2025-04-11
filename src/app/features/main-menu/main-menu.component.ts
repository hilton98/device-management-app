import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-menu',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './main-menu.component.html',
})
export class MainMenuComponent {}
