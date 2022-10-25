import {Component, ViewChild} from '@angular/core';
import { AppService } from './services/app.service';
import {Sensor} from "./services/sensor";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SensorService} from "./services/sensor-service.service";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  displayedColumns: string[] = ['Name', 'Model', 'Type', 'Range', 'Unit', 'Location', 'Edit'];
  dataSource!: MatTableDataSource<Sensor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public sensors : Sensor[] = [];

  constructor(public sensorService: SensorService, public app: AppService) {
    this.getSensors(true);
  }

  private getSensors(rebuild : boolean){
      this.sensorService.loadSensors().subscribe((response : Sensor[]) => {
        this.sensors = response;
        if (rebuild) this.dataSource = new MatTableDataSource(this.sensors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = this.sensors;
    })
  }

  deleteSensor(id : number){
    this.sensorService.deleteSensor(id).subscribe(() => {
      this.getSensors(false);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAdmin() : boolean{
    return localStorage.getItem("authRole") == 'ADMINISTRATOR';
  }
}
