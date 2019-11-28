import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage'


@Component({
  selector: 'app-cadlogin',
  templateUrl: './cadlogin.page.html',
  styleUrls: ['./cadlogin.page.scss'],
})
export class CadloginPage implements OnInit {
  form: FormGroup
  title
  constructor(private router : Router,private db : AngularFireDatabase, public provider : UserService,
    private formbuilder: FormBuilder,private toastController: ToastController,private afAuth: AngularFireAuth,
    private loadingController: LoadingController, private storage : Storage,    ) {
      this.form = this.formbuilder.group({
        nome: [null, [Validators.required, Validators.minLength(1)]],
        email : [null, [Validators.required, Validators.minLength(1)]],   
        celular : [null, [Validators.required, Validators.minLength(1)]],
        senha : [null, [Validators.required, Validators.minLength(6)]],
        confirmarsenha : [null, [Validators.required, Validators.minLength(6)]],  
        box : [null, [Validators.required, Validators.minLength(1)]],
        nomeempresa: [null, [Validators.required, Validators.minLength(1)]]
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
  async cadlogin(){
    if(this.form.value.senha == this.form.value.confirmarsenha){
        var loader  = await this.loadingController.create({
          message: 'Espere, por favor ...'
        })
        await loader.present();
    this.afAuth.auth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.senha)
    .then((response)=>{
      var id = response.user.uid
      this.db.database.ref('/Box').child(id).push({
       box : this.form.value.box
      })
      this.db.database.ref('/usuario').child(id).set({
        nome: this.form.value.nome,
        email:this.form.value.email,
        celular: this.form.value.celular,
        senha: this.form.value.senha,
        box: this.form.value.box,
        idempre :id,
        nomeempresa: this.form.value.nomeempresa,
        estoque: true,
        controle: true,
        funcionario: true
      }).catch(()=>{
        this.title = "Erro ao criar conta"
        loader.dismiss()
        this.presentToast();
      })
      .then(()=>{
        this.afAuth.auth.signInWithEmailAndPassword(
          this.form.value.email, this.form.value.senha)
          .then(() => {
            let listDB = this.db.database.ref('/usuario').child(id)
            listDB.once('value', (snapshot) =>{
              const items = snapshot.val() ;
              if(items){
                items.id = id
                this.provider.id = id
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
              })
            })
     
          }).then(()=>{
            this.router.navigate(['/index'])
        this.title = "Sucesso"
        loader.dismiss()
          })
    })
    }else{
      this.title = "As senhas não coincidem"
      this.presentToast()
    }

  }
}
