import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurtureVolComponent } from './curture-vol.component';

describe('CurtureVolComponent', () => {
  let component: CurtureVolComponent;
  let fixture: ComponentFixture<CurtureVolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurtureVolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurtureVolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
