import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSensorFormComponent } from './edit-sensor-form.component';

describe('EditSensorFormComponent', () => {
  let component: EditSensorFormComponent;
  let fixture: ComponentFixture<EditSensorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSensorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSensorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
