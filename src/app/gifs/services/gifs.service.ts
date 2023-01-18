import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = 'BG5naD1Q0dRJIy4oNKCQOFHQEAPrmIkX';
  private servicioUrl : string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[]= [];


  public resultados : Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  //El constructor se va a iniciar solamente una vez al inicio
  constructor( private http:HttpClient ){

    this._historial = JSON.parse(localStorage.getItem("Historial")!) || [];
    this.resultados = JSON.parse(localStorage.getItem("Resultados")!) || [];
    
  }

  buscarGifs( query: string){
    query = query.trim().toLowerCase();

    if( !this._historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('Historial', JSON.stringify(this._historial));
    }


    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','10')
          .set('q',query);

          

    //Peticiones http en Angular, en lugar de usar Fecth
    this.http.get<SearchGifsResponse>( `${this.servicioUrl}/search`,{ params } )
      .subscribe( ( response ) =>{
        this.resultados = response.data;
        localStorage.setItem('Resultados', JSON.stringify(this.resultados));
      })

  }

}
