# Autocomplete using API
Angular material autocomplate component that featch data.
Simply set an url to the config input and the component will generate an autocomplate component form the data that returns from the API


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
import { NgxAutocompleteApiModule } from 'ngx-autocomplete-api';
 
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
#### Custom view for option
```
<ngx-autocomplete-api [httpRequestConfig]="config" [mapDataFunction]="mapFunction">
    <div *option="let option">
        {{option.name}}
     </div>
</ngx-autocomplete-api>
```




##### Properties
#
| Name | Description |
| ------ | ------ |
| @Input('httpRequestConfig') config: HttpRequestConfig | Configuration for the http request. |
| @Input() mapDataFunction: (data: any) => any | Optinal. Map functoin for pipe the http request. |
| @Input() formFieldAppearance: MatFormFieldAppearance = 'standard' | Angular form field tag appearance |
| inputCtrl: FormControl = new FormControl('') | Form Control for the input |
| dataObserver: Observable<any> | observer for the data stream |
| inputSubscriber: Subscription | subscriber for user text input |
| dataApi: string;|Route for the HTTP request|
|textToReplace: string = '<textToReplace>'|Text inside to url need to be changed accurdenly to the user search|
|httpMethod: 'GET' \| 'POST' = 'GET'|  Which http method to use|
|fieldToDisplay: string;|Field name inside the return object to display in the autocomplate|


  
  
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
  