import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesListComponent } from './species-list.component';

describe('SpeciesListComponent', () => {
  let component: SpeciesListComponent;
  let fixture: ComponentFixture<SpeciesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpeciesListComponent]
    });
    fixture = TestBed.createComponent(SpeciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
