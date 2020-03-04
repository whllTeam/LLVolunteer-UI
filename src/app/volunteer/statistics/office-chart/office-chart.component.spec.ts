import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeChartComponent } from './office-chart.component';

describe('OfficeChartComponent', () => {
  let component: OfficeChartComponent;
  let fixture: ComponentFixture<OfficeChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
