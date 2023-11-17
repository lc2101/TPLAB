import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    

    const resultEvents = [];

    for (const event of value) {
      if ((arg === '' || arg.length < 3)&&
      (event.tickets > 0 && event.date > this.fechaActual())){
        resultEvents.push(event);

      }else if ((event.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
      event.category.toLowerCase()===arg.toLowerCase())&&
      (event.tickets > 0 && event.date > this.fechaActual())) {
        resultEvents.push(event);
        
      };
    };

    return resultEvents;
  } 
  public fechaActual(): string {
    let fechaActual = new Date();
    return fechaActual.toISOString().split('T')[0];
  }
  

}
