import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayWith'
})
export class DisplayWithPipe implements PipeTransform {

  transform(value: any, displayWithFn: (value) => string, component): unknown {
    return displayWithFn(value);
    // return displayWithFn.call(component, value);
  }

}
