import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonelogoutComponent } from './donelogout.component';

describe('DonelogoutComponent', () => {
  let component: DonelogoutComponent;
  let fixture: ComponentFixture<DonelogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonelogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonelogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
