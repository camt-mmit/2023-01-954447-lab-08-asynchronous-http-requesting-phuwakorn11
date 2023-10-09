import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCreatePageComponent } from './contact-create-page.component';

describe('ContactCreatePageComponent', () => {
  let component: ContactCreatePageComponent;
  let fixture: ComponentFixture<ContactCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactCreatePageComponent]
    });
    fixture = TestBed.createComponent(ContactCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
