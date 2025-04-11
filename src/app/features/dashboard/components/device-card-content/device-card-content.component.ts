import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DeviceCard } from '../../../interfaces/device-card.interface';

@Component({
  selector: 'app-device-card-content',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './device-card-content.component.html',
})
export class DeviceCardContentComponent {
  @Input() devices!: DeviceCard[]; 
}
