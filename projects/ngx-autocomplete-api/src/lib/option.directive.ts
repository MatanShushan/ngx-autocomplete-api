import { AfterViewInit, Directive, Input, OnInit, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxAutocompleteApiComponent } from './ngx-autocomplete-api.component';

@Directive({
  selector: '[option]'
})
export class OptionDirective implements AfterViewInit {

  @Input()
  set option(context: any) {
    this.context.$implicit = this.context.option = context;
  }

  context: any = {};

  constructor(
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    @SkipSelf() private autocomplete: NgxAutocompleteApiComponent

  ) { }

  ngAfterViewInit() {
    if(!this.autocomplete){
      throw console.error('Option directive must be set within ngx-autocomplete-api component')
    }
    this.autocomplete.setViewComponent(this.templateRef);
  }

}
