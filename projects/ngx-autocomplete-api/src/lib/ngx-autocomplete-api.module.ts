import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAutocompleteApiComponent } from './ngx-autocomplete-api.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { DisplayWithPipe } from './display-with.pipe';

@NgModule({
  declarations: [
    NgxAutocompleteApiComponent,
    DisplayWithPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [NgxAutocompleteApiComponent]
})
export class NgxAutocompleteApiModule { }
