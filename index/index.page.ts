import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
listar 
pesquisa
listafuncionario
somacompras = 0
somavendas = 0
qsomacompras = 0
qsomavendas = 0
despesas = 0
prejuizos = 0
total = 0
totalcartao = 0
totaldinheiro = 0
verificar = 0
meses = this.provider.mes
title
ano = this.provider.ano

constructor(public provider : UserService,private db : AngularFireDatabase,
  private toastController: ToastController) { 
  }

  ngOnInit(){
    this.metodoano()
  }
  doRefresh(event) {
    this.verificar = 0
    this.metodoano()

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  metodoano(){
    if(this.meses > this.provider.mes){
      this.listar = []
      this.ano = this.provider.ano - 1
      this.pesquisa = this.meses + this.ano.toString();
      this.getFuncionario()  
    }else if (this.meses <= this.provider.mes){
      this.listar = []
      this.pesquisa = this.meses + this.provider.ano.toString();
      this.ano = this.provider.ano;      
      this.getFuncionario()  
    }
 
  }
    getFuncionario(){
      if(this.provider.controle == true){
      let listDB = this.db.database.ref('/usuario').orderByChild('idempre').equalTo(this.provider.idempre)
          listDB.once('value', (snapshot) =>{
            const items = snapshot.val();
            if(items){
              this.listafuncionario = Object.keys(items).map(i => {items[i].id = i; return items[i] });
              this.placar()
            }else{
              this.listar = 1
            }
          })
        }else{
          let listDB = this.db.database.ref('/usuario').child(this.provider.id)
          listDB.once('value', (snapshot) =>{
            const items = snapshot.val();
            if(items){
              this.listafuncionario = items;
              this.placarunico()
            }else{
              this.listar = 1
            }
          })

        }
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: this.title,
        duration: 2000
      });
      toast.present();
    }
    placarunico(){
      this.somacompras = 0
      this.somavendas = 0
      this.qsomacompras = 0
      this.qsomavendas = 0
      this.despesas = 0
      this.prejuizos = 0
      this.total = 0
      this.totalcartao = 0
      this.totaldinheiro = 0
      this.listar = new Array
      let listDB = this.db.database.ref('/Lucro').child(this.pesquisa).child(this.provider.idempre).child(this.provider.id)
      listDB.once('value', (snapshot) =>{
        const items = snapshot.val();
        if(items){
          var l= { 
            nome: "",
            box: "",
            vquantidade: 0,
            tvenda: 0,
            tcompra : 0,
            qcompra: 0
          } 
            l.nome = this.listafuncionario.nome
            l.box = this.listafuncionario.box
            l.vquantidade = items.qvenda
            l.tvenda = items.tvenda
            l.tcompra = items.tcompra
            l.qcompra = items.qcompra
            this.listar.push(l)    
            if(items.prejuizo){
             this.prejuizos += items.prejuizo
            }
            if(items.despesas){
             this.despesas += items.despesas
            }
            if(items.tcompra){
             this.somacompras += items.tcompra

            }
            if(items.tvenda){
             this.somavendas += items.tvenda
            }
            if(items.qcompra){
             this.qsomacompras += items.qcompra
            }
            if(items.qvenda){
             this.qsomavendas += items.qvenda
            }
            if(items.total){
             this.total += items.total
            }

            if(items.cartao){
             this.totalcartao += items.cartao
            }
            this.totaldinheiro = this.somavendas - this.totalcartao
            this.verificar = 1
            this.doRefresh(event)
          }else{
            this.title = "Não há nenhuma operação feita nesse mês!"
            this.presentToast()
            this.verificar = 1
          }
          })
    }
    placar(){
      this.somacompras = 0
      this.somavendas = 0
      this.qsomacompras = 0
      this.qsomavendas = 0
      this.despesas = 0
      this.prejuizos = 0
      this.total = 0
      this.totalcartao = 0
      this.totaldinheiro = 0
      this.listar = []
      this.listar = new Array
      let listDB = this.db.database.ref('/Lucro').child(this.pesquisa).child(this.provider.idempre)
      listDB.once('value', (snapshot) =>{
        const items = snapshot.val();
        if(items){
          var lucro =  Object.keys(items).map(i => {items[i].id = i; return items[i] });
          var l= { 
            nome: "",
            box: "",
            vquantidade: 0,
            tvenda: 0,
            tcompra : 0,
            qcompra: 0
          } 
        for(var i = 0; i < this.listafuncionario.length; i++){
           for(var x =0; x < lucro.length;x ++){
          if (lucro[x].id == this.listafuncionario[i].id){   
            l= { 
              nome: "",
              box: "",
              vquantidade: 0,
              tvenda: 0,
              tcompra : 0,
              qcompra: 0
            }        
             l.nome = this.listafuncionario[i].nome
             l.box = this.listafuncionario[i].box
             l.vquantidade = lucro[x].qvenda
             l.tvenda = lucro[x].tvenda
             l.tcompra = lucro[x].tcompra
             l.qcompra = lucro[x].qcompra
             this.listar.push(l)
             if(lucro[x].prejuizo){
              this.prejuizos += lucro[x].prejuizo
             }
             if(lucro[x].despesas){
              this.despesas += lucro[x].despesas
             }
             if(lucro[x].tcompra){
              this.somacompras += lucro[x].tcompra

             }
             if(lucro[x].tvenda){
              this.somavendas += lucro[x].tvenda
             }
             if(lucro[x].qcompra){
              this.qsomacompras += lucro[x].qcompra
             }
             if(lucro[x].qvenda){
              this.qsomavendas += lucro[x].qvenda
             }
             if(lucro[x].total){
              this.total += lucro[x].total
             }

             if(lucro[x].cartao){
              this.totalcartao += lucro[x].cartao
             }
          }
           }
        }
        this.totaldinheiro = this.somavendas - this.totalcartao
        this.verificar = 1
        }else{
          this.title = "Não há nenhuma operação feita nesse mês!"
          this.presentToast()
          this.verificar = 1

        }
    })
    }
  
  



}
