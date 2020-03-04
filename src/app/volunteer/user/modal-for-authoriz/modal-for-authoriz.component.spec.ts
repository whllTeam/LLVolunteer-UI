import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalForAuthorizComponent } from './modal-for-authoriz.component';

describe('ModalForAuthorizComponent', () => {
  let component: ModalForAuthorizComponent;
  let fixture: ComponentFixture<ModalForAuthorizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalForAuthorizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalForAuthorizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
