# BETA!
# Autocomplete using API
Angular material autocomplate component that featch data


### Installation
```sh
$ yarn add ngx-autocomplete-api
```
or 
```sh
$ npm install ngx-autocomplete-api
```

### Usage  
Import NgxAutocompleteApiModule in your app:
```sh

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxAutocompleteApiModule } from 'dist/ngx-autocomplete-api';

 
@NgModule({
  imports: [
    HttpClientModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxAutocompleteApiModule,
    ]
})
export class AppModule {}
```
app.component
```
import { Component } from '@angular/core';
import { HttpRequestConfig } from 'ngx-autocomplete-api';

@Component({
  selector: 'app-root',
  template: `
      <ngx-autocomplete-api [httpRequestConfig]="config" [mapDataFunction]="mapFunction"></ngx-autocomplete-api>
  `,
  styles: []
})
export class AppComponent {

  value = 'Clear me';
  config: HttpRequestConfig = {
    method: 'GET',
    dataApi: 'https://demo.dataverse.org/api/search?q=<thisIsText>',
    fieldToDisplay: 'name',
    textInUrlToReplace: '<thisIsText>'
  };
  

  mapFunction = (data) => {
    return data.data.items
  }

}

```



##### Properties
#
| Name | Description |
| ------ | ------ |
| @Input('httpRequestConfig') config: HttpRequestConfig | Configuration for the http request. |
| @Input() mapDataFunction: (data: any) => any | Optinal. Map functoin for pipe the http request. |
| @Input() formFieldAppearance: MatFormFieldAppearance = 'standard' | TODO |
| inputCtrl: FormControl = new FormControl('') | TODO |
| dataObserver: Observable<any> | TODO |
| inputSubscriber: Subscription | TODO |
| dataApi: string;|TODO|
|textToReplace: string = '<textToReplace>'|TODO|
|httpMethod: 'GET' \| 'POST' = 'GET' = '<textToReplace>'|TODO|
|fieldToDisplay: string;|TODO|


  
  
##### API reference for Angular Material autocomplete
[Angular material autocomplete API](https://material.angular.io/components/autocomplete/api).

#
| Name | Description |
| ------ | ------ |
| @Input() displayWith: ((value: any) => string) | Function that maps an option's control value to its display value in the trigger. |
| @Input('class') classList: string string[]; | Takes classes set on the host mat-autocomplete element and applies them to the panel inside the overlay container to allow for easy styling. |
| @Input() autoActiveFirstOption: boolean | Whether the first option should be highlighted when an autocomplete panel is opened. |
  | @Input() disableRipple: boolean | Whether ripples are disabled.|
  | @Input() panelWidth: string \| number | Specify the width of the autocomplete panel. Can be any CSS sizing value, otherwise it will match the width of its host.|
  | @Input() panelWidth: string | Whether ripples are disabled.|
  | @Output() closed: EventEmitter<void> | Event that is emitted when the autocomplete panel is closed.|
  | @Output() opened: EventEmitter<void> | Event that is emitted when the autocomplete panel is opened.|
  | @Output() optionSelected: EventEmitter<MatAutocompleteSelectedEvent> | Event that is emitted whenever an option from the list is selected.|
   | @Output() optionActivated: EventEmitter<MatAutocompleteActivatedEvent> | Event that is emitted whenever an option from the list is selected.|
  