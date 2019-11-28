import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from '../user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { VenderService } from '../vender.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contasareceber',
  templateUrl: './contasareceber.page.html',
  styleUrls: ['./contasareceber.page.scss'],
})
export class ContasareceberPage {
teste = true;
cliente
procurarlist
val
  constructor(public provider : UserService,
    private db : AngularFireDatabase, public vercontas : VenderService,
    private router : Router) { }

  ionViewWillEnter(){
    this.getclientes()
 }
  receber(item) {
    this.vercontas.id = item.id
    this.vercontas.preco = item.preco
    this.vercontas.nome = item.nome
    this.vercontas.recebido = item.recebido
    this.vercontas.recebidocartao = item.recebidocartao
    this.router.navigate(['/venderproduto'])
    
  }
  
  getclientes(){
    let listDB = this.db.database.ref('/clientes').child(this.provider.idempre)
    listDB.on('value', (snapshot) =>{
      const items = snapshot.val();
      if(items){
        this.cliente = Object.keys(items).map(i => {items[i].id = i; return items[i] });   
        this.procurarlist = this.cliente   

      }else{
        this.cliente = 1
      } 
    }) 
}
procurarclientes(){
  if(this.cliente){
    if (this.val && this.val.trim() != '') {
      this.cliente = this.cliente.filter((item) => {
        return (item.nome.toLowerCase().indexOf(this.val.toLowerCase()) > -1);
      })
    }else{
      this.cliente= this.procurarlist
       }
  }
}

}
