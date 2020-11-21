import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Observable, Subscription } from 'rxjs';
import { debounce, debounceTime, map, startWith } from 'rxjs/operators';
import { HttpRequestConfig } from '../public-api';

@Component({
  selector: 'ngx-autocomplete-api',
  template: `
     <mat-form-field [appearance]="formFieldAppearance">
    <input type="text"
              [placeholder]="placeholder"
              matInput
              [formControl]="inputCtrl"
              [matAutocomplete]="auto">
       <mat-autocomplete 
       [autoActiveFirstOption]="autoActiveFirstOption"
         [disableRipple]="disableRipple"
         [panelWidth]="panelWidth"
         (closed)="closed($event)"
         (opened)="opened($event)"
         (optionActivated)="optionActivated($event)"
         (optionSelected)="optionSelected($event)"
         #auto="matAutocomplete"
         [displayWith]="displayWith"
         >
         <mat-option *ngFor="let option of dataObserver|async  " [value]="option">
            <ng-container *ngTemplateOutlet="!templateRef?noTemplateProvidedView:templateRef; context:{$implicit:option}">
            </ng-container>
            <ng-template #noTemplateProvidedView>
              {{option |displayWith:displayWith}}
            </ng-template>
          </mat-option>
       </mat-autocomplete>
      </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NgxAutocompleteApiComponent implements OnInit, OnDestroy {
  @Input() formFieldAppearance: MatFormFieldAppearance = 'standard';
  @Input() placeholder: boolean;

  @Input() mapDataFunction: (data: any) => any;
  @Input('httpRequestConfig') config: HttpRequestConfig;

  inputCtrl: FormControl = new FormControl('');
  dataObserver: Observable<any>;
  inputSubscriber: Subscription;
  templateRef: TemplateRef<any>;
  
  private dataApi: string;
  private textToReplace: string = '<textToReplace>';
  private httpMethod: 'GET' | 'POST' = 'GET';
  private fieldToDisplay: string;
  
  // mat-autocomplete api
  @Input() displayWith: ((value: any) => string) | null;
  @Input('class') classList: string | string[];
  @Input() autoActiveFirstOption: boolean;
  @Input() disableRipple: boolean;
  @Input() panelWidth: string | number;
  @Output('closed') closedEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output('opened') openedEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output('optionSelected') optionSelectedEvent: EventEmitter<MatAutocompleteSelectedEvent> = new EventEmitter<MatAutocompleteSelectedEvent>();
  @Output('optionActivated') optionActivatedEvent: EventEmitter<MatAutocompleteActivatedEvent> = new EventEmitter<MatAutocompleteActivatedEvent>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.validateInputs();
    if (this.config) {
      if (!this.displayWith) {
        this.displayWith = this.displayFn;
      }
      this.dataApi = this.config.dataApi;
      this.textToReplace = this.config.textInUrlToReplace || this.textToReplace;
      this.httpMethod = this.config.method || this.httpMethod;
      this.fieldToDisplay = this.config.fieldToDisplay;
      this.fetchData();
      this.subscribeToEventChange();
    }

  }

  fetchData(textToSearch = ''): void {
    let req;
    if (this.httpMethod === 'GET') {
      const url = this.dataApi.replace(this.textToReplace, textToSearch);
      req = this.http.get(url, this.config.options)

    } else if (this.httpMethod === 'POST') {
      const url = this.dataApi.replace(this.textToReplace, textToSearch);
      const body = this.getRequestBody(this.config.body, textToSearch)
      req = this.http.post(url, this.config.body, this.config.options)

    }

    this.dataObserver = req.pipe(
      map((item: any) => {
        if (this.mapDataFunction) {
          return this.mapDataFunction(item);
        }
        return item;
      })
    )
  }

  private getRequestBody(payload, textToSearch: string): any {
    const pathInObject: string[] = this.config.fieldInBodyToReplace.split('.');
    let fieldToReplace;
    for (const pathItem of pathInObject) {
      fieldToReplace = payload[pathItem];
    }
    fieldToReplace = textToSearch;
    return payload;
  }

  private subscribeToEventChange(): void {
    this.inputSubscriber = this.inputCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this.fetchData(value))
    ).subscribe()
  }


  private validateInputs(): void {
    if (!this.config) {
      throw console.error('httpRequestConfig must be provided!');
    }

    if (!this.config.dataApi) {
      throw console.error('dataApi must be provided!');
    }

    if (this.config.method === 'GET' && !this.config.dataApi.includes(this.config.textInUrlToReplace || this.textToReplace)) {
      throw console.error('text to replace must be provided within the dataApi!');
    }

  }

  displayFn = option => {
    if (this.fieldToDisplay) {
      if (this.fieldToDisplay.includes('.')) {
        const sections = this.fieldToDisplay.split('.');
        let displayData = '';
        for (const sectionField of sections) {
          displayData = option[sectionField];
        }
        return displayData;
      }
      return option[this.fieldToDisplay];
    }
    return option;

  }

  
  setViewComponent(template: TemplateRef<any>) {
    if (this.templateRef) {
      console.warn('More the one view provided');
    }
    this.templateRef = template;
  }

  closed($event) {
    this.closedEvent.emit($event);
  }
  opened($event) {
    this.closedEvent.emit($event);
  }
  optionSelected($event) {
    this.optionSelectedEvent.emit($event);
  }
  optionActivated($event) {
    this.optionActivatedEvent.emit($event);
  }
  ngOnDestroy(): void {
    if (this.inputSubscriber) {
      this.inputSubscriber.unsubscribe();
    }
  }

}
