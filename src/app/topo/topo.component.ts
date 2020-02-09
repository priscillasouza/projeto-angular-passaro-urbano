
import { Component, OnInit } from '@angular/core';

import { OfertasService } from './../ofertas.service';
import { Oferta } from '../shared/oferta.model';

import { Observable, Subject, of } from 'rxjs';
import { distinctUntilChanged, catchError, switchMap, debounceTime } from 'rxjs/operators';








@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>

  private subjectPesquisa: Subject<string> = new Subject<string>()

  //serviço injetado dentro do componente topo
  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    //retorno Oferta[]
    this.ofertas = this.subjectPesquisa
      .pipe(debounceTime(1000)) //executa a açã]odo switcmap após 1 segundo
      .pipe(distinctUntilChanged()) //para fazer pesquisas distintas
      .pipe(switchMap((termo: string) => {
        //logica para tratar espaços em branco
        if (termo.trim() === '') {
          //retornar um observable de array de ofertas vazio
          return of<Oferta[]>([])
        }
        return this.ofertasService.pesquisaOfertas(termo);
      })
    );
      catchError((err: any) => {
        return of<Oferta[]>([])
      })
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }
}



