import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  invokeSearchComponentFunction = new EventEmitter();    
  subsVar: Subscription; 
  constructor() { }
  onFirstComponentButtonClick(textoBuscarHeader:string) {    
    this.invokeSearchComponentFunction.emit(textoBuscarHeader);    
  }
}
