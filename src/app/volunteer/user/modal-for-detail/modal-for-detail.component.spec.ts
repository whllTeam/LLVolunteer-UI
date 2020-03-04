import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForDetailComponent } from './modal-for-detail.component';

describe('ModalForDetailComponent', () => {
  let component: ModalForDetailComponent;
  let fixture: ComponentFixture<ModalForDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalForDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
