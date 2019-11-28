import { Component, OnInit } from '@angular/core';
import { ToastController} from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  pesquisa
  listadecompras
  title
  loader
  ano = this.provider.ano
  listadevendas
  meses = this.provider.mes
  constructor(public provider : UserService,
    public db : AngularFireDatabase, private toastController: ToastController ) {
  
    }
  ngOnInit() {
    this.metodoano()
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
    this.listadecompras = undefined
      let listDB = this.db.database.ref('/controlecompras').child(this.pesquisa).child(this.provider.idempre)	
      listDB.on('value', (snapshot) =>{
        const items = snapshot.val();
        if(items){
          this.listadecompras = Object.keys(items).map(i => {items[i].id = i; return items[i] })
          this.listadecompras.reverse()
        }else{
          this.listadecompras = 1
        }   
      })
  
  }





}
