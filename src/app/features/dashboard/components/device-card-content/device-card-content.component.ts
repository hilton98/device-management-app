import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DeviceCard } from '../../../interfaces/device-card.interface';
import { DeviceCardMapper } from '../../../mappers/device-card.mapper';
import { DeleteDeviceService } from '../../../services/device/delete-device.service';
import { GetDevicesService } from '../../../services/device/get-devices.service';

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
export class DeviceCardContentComponent implements OnChanges {
  @Input() devices: DeviceCard[] = [];

  deviceList: DeviceCard[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devices']) {
      this.deviceList = [...this.devices];
    }
  }

  constructor(
    private deleteDeviceService: DeleteDeviceService,
    private getDevicesService: GetDevicesService,
    private deviceCardMapper: DeviceCardMapper
  ) {}

  handleDeleteDevice (id: number) {
    this.deleteDeviceService.execute(id).subscribe({
      next: () => {
        this.loadDevices()
      },
      error: (error) => {
        console.error('Error to delete device', error)
      }
    })
  }

  loadDevices() {
    this.getDevicesService.execute().subscribe({
      next: (data) => {
        this.deviceList = this.deviceCardMapper.mapMany(data)
      },
      error: (error) => {
        console.error('Error to load devices', error);
      }
    });
  }
}
