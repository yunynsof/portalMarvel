import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { HttpParams } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  apiResponse: any = [];
  responseList: any = [];
  marvelArray : any = [];
  sum = 0;
  scrollWindow = true;
  nameHero: any;
	
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
  
  //Metodo que realiza busqueda de heroes
  searchSuperHero(){
	 
	 this.marvelArray=[]
	 if(this.nameHero != null && this.nameHero != '' && this.nameHero != undefined){

	 this.scrollWindow = false;
	 const params = this.serviceService.getParams()
	 .set('limit', '100')
	 .set('nameStartsWith', this.nameHero)
	  this.getMarvelCharacters(params);  
	  
	 }else {
	  this.scrollWindow = true;
	  const params = this.serviceService.getParams().set('offset', this.sum.toString())
	  this.getMarvelCharacters(params);  
	 }
  }
  
  //Metodo que lleva pagina de editar
  goEdit(){
	  this.router.navigate(['editar']);
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
