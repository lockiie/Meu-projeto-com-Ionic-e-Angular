import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { UserService } from '../user.service';
import { AngularFireDatabase } from '@angular/fire/database';




@Component({
  selector: 'app-listvendas',
  templateUrl: './listvendas.page.html',
  styleUrls: ['./listvendas.page.scss'],
})
export class ListvendasPage {
title
pesquisa
ano =this.provider.ano
listadevendas
meses = this.provider.mes
  constructor(public provider : UserService, private alertController: AlertController,
    public db : AngularFireDatabase, private toastController: ToastController,
     private loadingController: LoadingController) { }

  async ionViewWillEnter(){
    this.metodoano()
  }
  metodoano(){
      this.pesquisa = this.meses + this.ano.toString();    
      this.getlista()
  }
  getlista(){
    this.listadevendas = undefined
    let listDB = this.db.database.ref('/controlevendas').child(this.pesquisa).child(this.provider.idempre)	
    listDB.on('value', (snapshot) =>{
      const items = snapshot.val();
      if(items){
        this.listadevendas = Object.keys(items).map(i => {items[i].id = i; return items[i] })
        this.listadevendas.reverse()
      }else{
        this.title = "Não há itens"
        this.presentToast()
        this.listadevendas = 1
      }   
    })

}
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.title,
      duration: 2000
    });
    toast.present();
  }

  async desfazer(item){
    const alert = await this.alertController.create({
      header: 'Desfazer a Venda?',
      message: 'Isso ira desfazer sua Venda',
      buttons: [
        {
          text: 'Cancelar',

        }, {
          text: 'Desfazer',
          handler: () => {
            this.desfazermetodo(item)
          }
        }
      ]
    });
  
    await alert.present();
  
  }
  
  async desfazermetodo(item){
    var loader  = await this.loadingController.create({
      message: 'Espere, por favor ...'
    })
    await loader.present();
  var dinheiroproduto = item.quantidade * item.preco
  let caminho = this.db.database.ref('/Lucro').child(this.provider.del).child(this.provider.idempre).child(this.provider.id)
   caminho.once('value', (snapshot) =>{
   const items = snapshot.val();
   if(items){
    var qvenda = items.qvenda - item.quantidade
    var xtvenda = items.tvenda - dinheiroproduto
    var totaldinheiro = items.total - dinheiroproduto
    if(item.pagamento == 'cartao'){
      var total = items.cartao - dinheiroproduto
      caminho.update({
        total: totaldinheiro,
        qvenda: qvenda,
        tvenda: xtvenda,
        cartao: total
      })
    }else{
      caminho.update({
        total: totaldinheiro,
        qvenda: qvenda,
        tvenda: xtvenda
      })

    }
}else{
var dinheironegativo = ((item.quantidade * item.preco) * -1)
let quantidade = (item.quantidade * -1)
if(item.pagamento == 'cartao'){
  caminho.set({
    qcompra : 0, 
    tcompra : 0,    
    total: dinheironegativo,
    qvenda: quantidade,
    tvenda: dinheironegativo,
    cartao: dinheironegativo,
    despesas: 0,
    prejuizo: 0
    
  })
}else{
  caminho.set({
    qcompra : 0, 
    tcompra : 0,    
    total: dinheironegativo,
    qvenda: quantidade,
    tvenda: dinheironegativo,
    cartao: 0,
    despesas: 0,
    prejuizo: 0

  })
} 
}}).then(()=>{
  let listDB = this.db.database.ref('/produtos').child(this.provider.idempre).child(item.box).child(item.idproduto)
  listDB.once('value', (snapshot) =>{
    const items = snapshot.val();
    if(items){
      let quantidadetotal = items.quantidade + item.quantidade
      listDB.update({
        quantidade : quantidadetotal,
      })

    }else{
      listDB.set({
        nome : item.nomeproduto,
        quantidade : item.quantidade,
        precopago : item.precopago,
        precominimo : item.precominimo,
        descricao: item.descricao,
      })
    }
  })
})
  this.db.database.ref('/controlevendas').child(this.pesquisa).child(this.provider.idempre).child(item.id).remove()
  this.getlista()
  this.title = "Venda desfeita com Sucesso!"
  loader.dismiss()
  this.presentToast()
}
  

  
}
