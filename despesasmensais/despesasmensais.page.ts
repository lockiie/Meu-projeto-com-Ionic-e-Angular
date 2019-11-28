import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../user.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-despesasmensais',
  templateUrl: './despesasmensais.page.html',
  styleUrls: ['./despesasmensais.page.scss'],
})
export class DespesasmensaisPage {
 title
ppagar = false
valor  = new Array
despesasmensais
mes = this.provider.mes
  constructor(private db : AngularFireDatabase, 
    public provider : UserService, private loadingController: LoadingController,
    private toastController: ToastController) {
      this.list()

     }
  ionViewDidEnter(){
   }
async pagar(item, index) {
    var loader  = await this.loadingController.create({
      message: 'Espere, por favor ...'
    })   
      await loader.present();

  if(item.mes != this.mes){
  let listDB = this.db.database.ref('/Lucro').child(this.provider.del).child(this.provider.idempre).child(this.provider.id)
  listDB.once('value', (snapshot) =>{
  const items = snapshot.val();
   if(items){
    let total =  items.total - this.valor[index]
    let despesas = items.despesas + this.valor[index]
  listDB.update({
   total   : total,
   despesas : despesas,   
   })
   }else{      
     let totalnegativo =  this.valor[index] * -1
     listDB.set({
     qcompra : 0, 
     tcompra : 0,   
     prejuizo: 0, 
     total: totalnegativo,
     despesas: this.valor[index],
     qvenda: 0,
     tvenda: 0,
     cartao: 0
   })   
  }
}) 
this.db.database.ref('/despesasmensais').child(this.provider.idempre).child(item.id).update({
  mes: this.provider.mes,
  valor: this.valor[index]
})
this.list()
this.title = "Pago com Sucesso"
this.presentToast()
loader.dismiss()
}                
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.title,
      duration: 2000
    });
    toast.present();
  }
list(){
    let listDB = this.db.database.ref('/despesasmensais').child(this.provider.idempre)
    listDB.on('value', (snapshot) =>{
      const items = snapshot.val();
      if(items){
        this.despesasmensais = Object.keys(items).map(i => {items[i].id = i; return items[i] });   
      }else{
        this.despesasmensais = 1
      } 
    }) 

}



}
