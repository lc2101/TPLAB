import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /* transform(value: any, arg: any): any {

    if (arg === '' || arg.length < 3) return value;

    const resultEvents = [];

    for (const event of value) {
      if (event.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultEvents.push(event);
      };
    };

    return resultEvents;
  } */
  transform(value: any, arg: any): any {

    if (arg === '' || arg.length < 3) return value;

    const resultEvents = [];

    for (const event of value) {
      if (event.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      event.category.toLowerCase()===arg.toLowerCase()) {
        resultEvents.push(event);
      };
    };

    return resultEvents;
  } 
  

}
