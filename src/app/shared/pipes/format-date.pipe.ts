import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ngxFormatDate' })
export class FormatDatePipe implements PipeTransform {
  transform(date: string): string {
    let year:string;
    let month:string;
    let day:string;

    if(date.length == 8){
      year = date.substring(0,4);
      month = date.substring(4, 6);
      day = date.substring(6,8);

      return day + "/" + month + "/" + year;
    }else{
      return "";
    }
  }
}