import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController, ActionSheetController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-prejuizo',
  templateUrl: './prejuizo.page.html',
  styleUrls: ['./prejuizo.page.scss'],
})
export class PrejuizoPage implements OnInit {
meses= this.provider.mes
ano= this.provider.ano
pesquisa
title
prejuizo

  constructor(public provider : UserService,
    public db : AngularFireDatabase, private toastController: ToastController,
    private actionSheetController: ActionSheetController,private loadingController: LoadingController) {
      this.metodoano()

   }
   async ionViewWillEnter(){
  }
  ngOnInit() {
  }
  metodoano(){
    if(this.meses > this.provider.mes){
      this.ano = this.provider.ano - 1
      this.pesquisa = this.meses + this.ano.toString();
      this.getlista()
    }else if (this.meses <= this.provider.mes){
      this.pesquisa = this.meses + this.provider.ano.toString();
      this.ano = this.provider.ano;      
      this.getlista()
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.title,
      duration: 2000
    });
    toast.present();
  }
  getlista(){
    this.prejuizo = undefined
      let listDB = this.db.database.ref('/prejuizos').child(this.pesquisa).child(this.provider.idempre)	
      listDB.on('value', (snapshot) =>{
        const items = snapshot.val();
        if(items){
          this.prejuizo = Object.keys(items).map(i => {items[i].id = i; return items[i] })
          this.prejuizo.reverse()
        }else{
          this.title = "Não há itens"
          this.presentToast()
          this.prejuizo = 1
        }   
      })
  }
  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [ {
        text: 'Desfazer',
        icon: 'trash',
        handler: () => {
          this.desfazer(item)        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }
  async desfazer(item){
    var loader  = await this.loadingController.create({
      message: 'Espere, por favor ...'
    })
    await loader.present();
    let caminho = this.db.database.ref('/Lucro').child(this.provider.del).child(this.provider.idempre).child(this.provider.id)
    caminho.once('value', (snapshot) =>{
    const items = snapshot.val();
    if(items){
      var prejuizos = items.prejuizo - item.valor
      var total = items.total + item.valor
       caminho.update({
         total: total,
         prejuizo: prejuizos
       })
     }else{
      var desfazer = item.valor * -1
       caminho.set({
        qcompra : 0, 
        tcompra : 0,    
        total: item.valor,
        qvenda: 0,
        tvenda: 0,
        cartao: 0,
        despesas: 0,
        prejuizo: desfazer
       })
     }
  }).then(()=>{
    let listDB = this.db.database.ref('/produtos').child(this.provider.idempre).child(item.boxproduto).child(item.idproduto)
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
          precopago : item.valor,
          precominimo : item.precominimo,
          descricao: item.descricaoproduto,
        })
      }
    })
  })
  .then(()=>{
    this.db.database.ref('/prejuizos').child(this.provider.del).child(this.provider.idempre).child(item.id).remove()
    this.title = "Prejuizo Desfeito com Sucesso!"
    this.getlista()
    loader.dismiss()
    this.presentToast()
  })
  .catch(()=>{
    this.title = "Erro ao desfazer prejuizo Verifique sua conexão com a internet!"
    loader.dismiss()
    this.presentToast()
  })

}
}
