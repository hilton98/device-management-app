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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DeviceList } from '../../../../shared/models/device.model';

@Component({
  selector: 'app-device-card-content',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  templateUrl: './device-card-content.component.html',
})
export class DeviceCardContentComponent implements OnChanges {
  @Input() devices!: DeviceList;
  deviceList: DeviceCard[] = [];
  form: FormGroup;
  pageSizeOptions= [5, 10, 50, 100]
  pageSize = 10;
  items = 0;
  page = 0;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['devices']) {
      const { devices, total } = this.devices;
      this.deviceList = this.deviceCardMapper.mapMany(devices);
      this.items = total;
    }
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
    const currentPage = this.page + 1;
    this.getDevicesService.execute( { page: currentPage, itemsPerPage: this.pageSize } ).subscribe({
      next: (data) => {
        const {devices, total} = data;
        this.deviceList = this.deviceCardMapper.mapMany(devices)
        this.items = total
      },
      error: (error) => {
        console.error('Error to load devices', error);
      }
    });
  }

  async onPageFired(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDevices();
  }

}
