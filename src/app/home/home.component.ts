import { Component, OnInit } from '@angular/core';

import { OfertasService } from '../ofertas.service';
import { Oferta } from './../shared/oferta.model';

//Como pegar essa classe OfertasService e injetar dentro do componente home
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    //aqui acessa a variavel ofertasService

    this.ofertasService.getOfertas()
      .then(( ofertas: Oferta[] ) => {
        this.ofertas = ofertas

      })
      .catch(( param: any ) => {
      })
  }
}
