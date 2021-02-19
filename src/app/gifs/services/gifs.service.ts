import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey = 'lMi81W040cUzMsjdcWPtm8O5Bz1xMEGt';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private HISTORIAL: string[] = [];
  public resultados: Gif [] = [];

  get historial(): string[] {
    return [...this.HISTORIAL];
  }
  constructor(private http: HttpClient) {
    // tslint:disable-next-line:no-non-null-assertion
    this.HISTORIAL = JSON.parse(localStorage.getItem('historial')!) || [];

    // tslint:disable-next-line:no-non-null-assertion
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string): void {
    // Quita espacios antes y después, lo transforma en minúsculas
    query = query.trim().toLowerCase();
    // Si no existe en el historial, lo inserta
    if (!this.HISTORIAL.includes(query)){
      this.HISTORIAL.unshift(query);
      this.HISTORIAL = this.HISTORIAL.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this.HISTORIAL));
    }
    // Definir parámetros de URL
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    // hacer consulta
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
    .subscribe( (resp: any) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }
}
