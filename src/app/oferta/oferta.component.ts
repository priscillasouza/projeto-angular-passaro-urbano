import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OfertasService } from './../ofertas.service';
import { CarrinhoService } from '../carrinho.service';

import { Oferta } from './../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]

})

export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute, 
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService 
    
  ) { }

  ngOnInit() {
    //fazendo um subscribe nos parametros da rota
    this.route.params.subscribe((parametros: Params) => {

      //Recuperando os parâmetros da rota através do snapshot
      this.ofertasService.getOfertaPorId( parametros.id)
      .then(( oferta: Oferta) => {
        this.oferta = oferta;
        //console.log(this.oferta);
      })
     
    }) 
  }

  ngOnDestroy() {
  }

  public adicionarItemCarrinho(oferta: Oferta): void {
    this.carrinhoService.incluirItem(this.oferta)
    console.log(this.carrinhoService.exibirItens());
  }
}


