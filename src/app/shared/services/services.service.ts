import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

   URL_SERVER: string = 'https://gateway.marvel.com/v1/public/characters';
   TS = '1';
   PUBLIC_KEY = '89a771e0fac3869db84803a215a685d9';
   PRIVATE_KEY = 'b9f7f14b950d52b4d2ee43991f30374fb2932d45';
   
  constructor(
   private httpClient: HttpClient
   ) { }
   
   //Metodo que obtiene informacion de Api Marvel; Tipo GET
    getMarvelCharacters(params: HttpParams) {

    return new Promise(resolve => {
      this.httpClient.get(`${this.URL_SERVER}`, { params }).subscribe(data => {
        resolve(data);
      }, err => {

      });
    });
  }
  
   // Metodo que obtiene los parametros necesarios  
    getParams(){
	  		
      const md5 = new Md5();	
	  const params = new HttpParams()
      .set('ts', this.TS)
      .set('apikey', this.PUBLIC_KEY)
	  .set('hash', (md5.appendStr(this.TS+this.PRIVATE_KEY+this.PUBLIC_KEY).end()).toString())
	  return params
    }

}
