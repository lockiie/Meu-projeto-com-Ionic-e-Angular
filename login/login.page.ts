import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
form: FormGroup
title
  constructor(private storage : Storage,private router : Router, private formbuilder: FormBuilder
    ,private db : AngularFireDatabase,
    public provider : UserService,private toastController: ToastController, 
    private loadingController: LoadingController,private afAuth: AngularFireAuth,) {
      this.form = this.formbuilder.group({
        email: [null, [Validators.required, Validators.minLength(1)]],
        senha : [null, [Validators.required, Validators.minLength(6)]],   

      })
     }

  ngOnInit() {
  }
 
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.title,
      duration: 2000
    });
    toast.present();
  }
  async login() {
  var loader  = await this.loadingController.create({
    message: 'Espere, por favor ...'
  })
  await loader.present();
    this.afAuth.auth.signInWithEmailAndPassword(
      this.form.value.email, this.form.value.senha)
      .then((response) => {
        let listDB = this.db.database.ref('/usuario').child(response.user.uid)
        listDB.once('value', (snapshot) =>{
          const items = snapshot.val() ;
          if(items){
            items.id = response.user.uid
            this.provider.id = response.user.uid
            this.provider.idempre = items.idempre
            this.provider.nomedaempresa = items.nomeempresa
            this.provider.nome= items.nome
            this.provider.box = items.box
            this.provider.estoque = items.estoque
            this.provider.controle = items.controle
            this.provider.funcionario = items.funcionario
            let x = [items]

            this.storage.set('user', x)

      }
      }).then(()=>{
        this.router.navigate(['/index'])
        loader.dismiss();
      })
      })
      .catch((error) => {
        loader.dismiss();
        if(error.code == 'auth/wrong-password') {
          this.title = "Senha Incorreta"
          this.presentToast()
        }else{
          this.title = "Email Incorreto"
          this.presentToast()
        }
      })
  }
}
