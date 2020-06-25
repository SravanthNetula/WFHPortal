import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginusersComponent } from './loginusers.component';

describe('LoginusersComponent', () => {
  let component: LoginusersComponent;
  let fixture: ComponentFixture<LoginusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
