import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { Gif } from '../interfaces/gifs.interfaces';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent implements OnInit {

  // tslint:disable-next-line:typedef
  get resultados() {
    return this.gifsService.resultados;
  }
  constructor( private gifsService: GifsService) { }

  ngOnInit(): void {
  }

}
