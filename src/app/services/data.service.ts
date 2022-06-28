import { Injectable } from '@angular/core';
import { Client, NgxSoapService } from 'ngx-soap';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  client: Client;
  private clienteReady = new BehaviorSubject(false);

  constructor(private soap: NgxSoapService) { 
    soap.createClient('/assets/public.wsdl').then((client)=>{
      console.log('cliente',client);
      this.client = client;
      this.clienteReady.next(true);
    })
  }

  clientState(){
    return this.clienteReady.asObservable();
  }

  getContinent(){

    const body = {
      ListOfCountryNamesByName: {

      }
    }

    return this.client.call('ListOfCountryNamesByName', {}).pipe(map((data)=>{
      return data.result.ListOfCountryNamesByNameResult.tCountryCodeAndName;
    }))
  }

}
