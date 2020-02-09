import { HttpClient } from '@angular/common/http';


import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';

import { URL_API } from './app.api';
import { Observable } from 'rxjs';


import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';

//não é preciso importar o rxjs 
//não precisa importar o pipe pois ele é um operador do observable

@Injectable()
export class OfertasService {

    private url_api = 'http://localhost:3000/ofertas'

    constructor(private http: HttpClient ) {}

    //criando um metodo de ofertas
    //getOfertas responsável por retornar um Array de ofertas
    //retorna informações que já estão prontas
    public getOfertas(): Promise<Oferta[]> {
        //retorna uma API fake, uma API mockada 
        //efetuar uma requisição http
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
        .toPromise()
        .then((resposta: any) => resposta)
        //não precisa inserir o .json() na resposta
        //retornar uma Promise de array de Oferta[]
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta: any) => resposta)
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta.shift()
        })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: any) => {
                return resposta.shift().descricao;
            })
    }

    //aqui estamos usando promise
    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
        .toPromise()
        .then((resposta: any) => {
            return resposta.shift().descricao;
        })
    }

    //aqui estamos usando observable
    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
        //o map recupera os eventos disparados na stream do observable
        .pipe(retry(10))
        .pipe(map((resposta: any) => resposta))
          
    }
}
































    //Processo sem o consumo de uma API
    /*public getOfertas2(): Promise<Oferta[]> {
        //instanciando o objeto promise
        return new Promise((resolve, reject) => {
            //aqui é feito algum tipo de processamento que ao finalizar chama a função resolve ou a reject

            //console.log('passou')
            let deu_certo = true;

            if(deu_certo){
                //forma assincrona
                setTimeout(() => resolve(this.ofertas), 3000)
               
            } else {
                reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado xyz'})
            }
        })
        .then(( ofertas: Oferta[]) => {
            //fazer alguma  tratativa
            console.log('primeiro then');

            return ofertas;
        })
        .then(( ofertas: Oferta[]) => {
            console.log('segundo then')
            return new Promise(( resolve2, reject2) => {
                setTimeout(() => { resolve2( ofertas )}, 3000)
            })
        })
        .then(( ofertas: Oferta[]) => {
            console.log('terceiro then executado após 3 segundos porque estava aguardando uma promise ser resolvida')
            return ofertas
        })
    }*/

