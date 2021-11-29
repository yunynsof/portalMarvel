import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { HttpParams } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  apiResponse: any = [];
  responseList: any = [];
  marvelArray : any = [];
  sum = 0;
  disabledEdit: boolean = true;
	
  constructor(
  private serviceService: ServicesService,
  private router: Router
  ) { }

  ngOnInit(): void {
	  const params = this.serviceService.getParams().set('offset', this.sum.toString())
	  this.getMarvelCharacters(params);  
  }
  
 //Metodo que llama la Api Mrvel, e inserta en el array marvelArray.
  getMarvelCharacters(valueParams: HttpParams) {
    
    this.serviceService.getMarvelCharacters(valueParams)
      .then(dataApi => {
		
		this.apiResponse = dataApi;
		this.responseList = this.apiResponse.data.results;
		for(let a =0; a <this.responseList.length; a++){
			this.responseList[a].modified = this.getDateFormat(this.responseList[a].modified);
		}

		 for(let b =0; b <this.responseList.length; b++){
			 this.marvelArray.push(this.responseList[b])
		 }
         });
  }
  
  //Metodo que retorna a pagina principal
  goPrincipal(){
	  this.router.navigate(['principal']);
  }
  
  //Metodo que deshabilita elementos html
  goView(){
	  this.disabledEdit = false;
  }
  
  //Metodo que habilita elementos html
  goEdit(){
	  this.disabledEdit = true;
  }

 //Metodo que lee cuando el usuario va bajando buscando mas informacion
  onScrollDown(ev: any) {
   this.sum += 20;
   this.addItems("push");
  }

 //Metodo que lee cuando el usuario va subiendo en el sitio web
  onScrollUp(ev: any) {
    this.addItems("splice");
  }

 //Metodo que obtiene mas informacion y la agrega a marvelArray; o viceversa quita info de marvelArray
  addItems(_method: string) { 
      
      if( _method === 'push'){
		  
      const params = this.serviceService.getParams().set('offset', this.sum.toString())
	  this.getMarvelCharacters(params);  
		
      }else if( _method === 'splice'&& this.sum >19){

		  let sumSubstract = this.sum - 20
		  let sumOriginal = this.sum 
		  this.sum -= 20;
		 
          for(let i=sumOriginal; i > sumSubstract; i--){
			  this.marvelArray.splice(i+19, 1);
		  }
	  } 
   }
   
  //Metodo que da formato a la fecha 
   getDateFormat(data: any) {

    if (data != '' && data != null) {
      let date = new Date(Date.parse(data));
      let month = (date.getMonth() + 1)
      return (date.getDate() < 10 ? '0' : '')+ date.getDate() + "-" + (month < 10 ? '0' : '') + month + "-" + date.getFullYear();
    } else return '';
  }

}
