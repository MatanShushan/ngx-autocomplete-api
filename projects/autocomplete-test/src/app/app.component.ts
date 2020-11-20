import { Component } from '@angular/core';
import { HttpRequestConfig } from 'ngx-autocomplete-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'autocompleteTest';
  value = 'Clear me';
  
  config: HttpRequestConfig = {
    method: 'GET',
    dataApi: 'https://demo.dataverse.org/api/search?q=<thisIsText>',
    fieldToDisplay: 'name',
    textInUrlToReplace: '<thisIsText>'
  };

  mapFunction = (data) => {
    return data.data.items;
  }
}

