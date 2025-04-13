import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DeviceCard } from '../../../interfaces/device-card.interface';
import { DeviceCardMapper } from '../../../mappers/device-card.mapper';
import { DeleteDeviceService } from '../../../services/device/delete-device.service';
import { GetDevicesService } from '../../../services/device/get-devices.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetDeviceByIdService } from '../../../services/device/get-device-by-id.service';

@Component({
  selector: 'app-device-card-content',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './device-card-content.component.html',
})
export class DeviceCardContentComponent implements OnChanges {
  @Input() devices: DeviceCard[] = [];
  deviceList: DeviceCard[] = [];
  form: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devices']) {
      this.deviceList = [...this.devices];
    }
  }

  constructor(
    private deleteDeviceService: DeleteDeviceService,
    private getDevicesService: GetDevicesService,
    private getDeviceByIdService: GetDeviceByIdService,
    private deviceCardMapper: DeviceCardMapper,
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

  handleFindDeviceById() {
    if (this.form.valid) {
      const deviceId = this.form.value.id;
      this.getDeviceByIdService.execute(deviceId).subscribe(
        {
          next: (data) => {
            this.deviceList = [this.deviceCardMapper.mapOne(data)];
          },
          error: (error) => {
            console.error('Error to find device', error)
          }
        }
      )
    }
  }

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
