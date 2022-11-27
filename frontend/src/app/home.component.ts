import {Component, ViewChild} from '@angular/core';
import {AppService} from './services/app.service';
import {Sensor} from "./services/sensor";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {SensorService} from "./services/sensor-service.service";
import {SensorState} from "./store/state/home-table.state";
import {select, Store} from "@ngrx/store";
import {selectSensors} from "./store/selector/home-table.selector";
import {deleteSensors, getSensors} from "./store/action/home-table.actions";

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  displayedColumns: string[] = ['Name', 'Model', 'Type', 'Range', 'Unit', 'Location', 'Edit'];
  dataSource!: MatTableDataSource<Sensor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public sensorService: SensorService, public app: AppService, private store: Store<SensorState>) {
    this.getSensors();
  }

  private getSensors(){
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = [];
    this.store.dispatch(getSensors());
    this.store.pipe(select(selectSensors)).subscribe((sensors: Sensor[]) => {
        this.dataSource = new MatTableDataSource<Sensor>(sensors);
        this.dataSource.paginator = this.paginator;
      })
  }

  deleteSensor(id : number){
    this.store.dispatch(deleteSensors(id));
    this.store.dispatch(getSensors());
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
