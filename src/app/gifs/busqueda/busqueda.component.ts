import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent implements OnInit {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
  constructor(private gifsService: GifsService) { }
  buscar(): void {
    const valor = this.txtBuscar.nativeElement.value;
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }
  ngOnInit(): void {
  }

}
