import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { EditarfuncionarioService } from '../editarfuncionario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.page.html',
  styleUrls: ['./funcionario.page.scss'],
})
export class FuncionarioPage {
  funcionarios
  title
  constructor(private db : AngularFireDatabase, 
    public provider : UserService,private router : Router, private toastController: ToastController,
    public editarfuncionario : EditarfuncionarioService,private alertController: AlertController,
     private loadingController: LoadingController) {

     }
     ionViewWillEnter(){
      this.list()
    }
  list(){
    let listDB = this.db.database.ref('/usuario').orderByChild('idempre').equalTo(this.provider.idempre)
    listDB.on('value', (snapshot) =>{
      const items = snapshot.val();
      if(items){
        this.funcionarios = Object.keys(items).map(i => {items[i].id = i; return items[i] });   
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
alterar(item){
  this.editarfuncionario.dados = item
  this.router.navigate(['/cadfuncionario'])
  console.log(this.editarfuncionario.dados)
}
async desfazer(item){
  var loader  = await this.loadingController.create({
    message: 'Espere, por favor ...'
  })   
    await loader.present();
  this.db.database.ref('/usuario').child(item.id).remove().then(()=>{
    this.title = "Usuário excluido com sucesso!"
    this.presentToast()
    loader.dismiss()
  }).catch(()=>{
    this.title = "Erro ao excluir usuário, verifica sua conexão com a internet!"
    this.presentToast()
    loader.dismiss()
  })
}
async excluir(item){
  const alert = await this.alertController.create({
    header: 'Tem certeza que deseja demitir este funcionário',
    buttons: [
      {
        text: 'Cancelar'
      },
    {
      text: 'Demitir',
        handler: () => {
          this.desfazer(item)
     
       }   }
    ]
  });
  await alert.present();
}

}
