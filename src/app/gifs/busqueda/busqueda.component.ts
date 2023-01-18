import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {


  //Va a buscar el elemento al que estamos haciendo referencia
  // y lo va asignar a ese elemento txtBuscar

  // el operador !(Non-null assertion operator) sirve para especificar que un elemento no va a ser nulo nunca
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor( private gifsService:GifsService){ }

  buscar(  ){
    const valor = this.txtBuscar.nativeElement.value;
     if( valor.trim.length < 0 ){
      alert('vacio')
     }

    this.gifsService.buscarGifs(valor)

    //Se limpia el input
    this.txtBuscar.nativeElement.value='';
  }

}
