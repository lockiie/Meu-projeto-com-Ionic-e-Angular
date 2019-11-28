import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VenderService {
   id : string
   preco : number
   nome : string
   recebido = 0
   recebidocartao = 0

   nomeprejuizo: string
   precoprejuizo : number
   quantidadeprejuizo : number
   idprejuizo : string
   boxprejuizo
   descricao : string
   precominimo : number



}
