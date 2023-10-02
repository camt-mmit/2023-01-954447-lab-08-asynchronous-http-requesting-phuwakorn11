import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationPageComponent } from './authorization-page.component';

describe('AuthorizationPageComponent', () => {
  let component: AuthorizationPageComponent;
  let fixture: ComponentFixture<AuthorizationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthorizationPageComponent]
    });
    fixture = TestBed.createComponent(AuthorizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
