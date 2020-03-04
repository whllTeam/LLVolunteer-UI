import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DormitoryChartComponent } from './dormitory-chart.component';

describe('DormitoryChartComponent', () => {
  let component: DormitoryChartComponent;
  let fixture: ComponentFixture<DormitoryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DormitoryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DormitoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
