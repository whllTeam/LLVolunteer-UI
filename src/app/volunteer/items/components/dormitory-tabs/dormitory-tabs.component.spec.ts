import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DormitoryTabsComponent } from './dormitory-tabs.component';

describe('DormitoryTabsComponent', () => {
  let component: DormitoryTabsComponent;
  let fixture: ComponentFixture<DormitoryTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DormitoryTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DormitoryTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
