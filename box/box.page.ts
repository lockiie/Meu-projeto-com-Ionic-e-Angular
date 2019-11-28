import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-box',
  templateUrl: './box.page.html',
  styleUrls: ['./box.page.scss'],
})
export class BoxPage {

  constructor(public provider : UserService, private db : AngularFireDatabase,
    private toastController: ToastController) { }
box
title
  ionViewWillEnter(){
    this.list()
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.title,
      duration: 2000
    });
    toast.present();
  }

  list(){
    let listDB = this.db.database.ref('/Box').child(this.provider.idempre)
    listDB.on('value', (snapshot) =>{
      const items = snapshot.val();
      if(items){
        this.box = Object.keys(items).map(i => {items[i].id = i; return items[i] });
        let caminho = this.db.database.ref('/produtos').child(this.provider.idempre)
        for(let index = 0, total = this.box.length; index < total; index++){
          let produtos
          caminho.child(this.box[index].box).once('value', (snapshot) =>{
            const items = snapshot.val();
            if(items){
              produtos =  Object.keys(items).map(i => items[i])
              this.box[index].qntprodutos = produtos.length
            }else{
              this.box[index].qntprodutos = 0
            }
          })
        }
      }else{
        this.title = "Não há Box Cadastrado"
        this.presentToast()
        this.box = 1
      } 
    }) 

}




}
