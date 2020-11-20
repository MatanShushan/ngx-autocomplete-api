import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAutocompleteApiComponent } from './ngx-autocomplete-api.component';

describe('NgxAutocompleteApiComponent', () => {
  let component: NgxAutocompleteApiComponent;
  let fixture: ComponentFixture<NgxAutocompleteApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxAutocompleteApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAutocompleteApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
