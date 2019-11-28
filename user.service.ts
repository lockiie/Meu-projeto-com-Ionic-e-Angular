import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  id : string
  idempre : string
  nomedaempresa : string
  mes
  ano 
  del 
  dia
  nome : string
  box : string
  controle
  estoque
  funcionario
  constructor() { 
    var d= new Date();
    this.dia = d.getDate()
    this.mes = d.getMonth() 
    this.ano = d.getFullYear()
    this.del = this.mes + this.ano.toString();
  }
 


  
}
