import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { UserService } from '../user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadbox',
  templateUrl: './cadbox.page.html',
  styleUrls: ['./cadbox.page.scss'],
})
export class CadboxPage implements OnInit {
form : FormGroup
title
  constructor(private router : Router, private formbuilder: FormBuilder,private db : AngularFireDatabase,
    public provider : UserService,private toastController: ToastController, 
    private loadingController: LoadingController) {
   this.form = this.formbuilder.group({
      box: [null, [Validators.required, Validators.minLength(1)]],
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

  async cadastrar(){
    var loader  = await this.loadingController.create({
     message: 'Espere, por favor ...'
   })
   await loader.present();
   this.db.database.ref('/Box').child(this.provider.idempre).push({
     box: this.form.value.box,
   }).then(()=>{
     this.title = "Box Cadastrado com Sucesso!"
     loader.dismiss()
     this.presentToast()
     this.router.navigate(['/box'])
   }).catch(()=>{
     this.title = "Erro ao Cadastrar!"
     loader.dismiss()
     this.presentToast()
   })

     }

}
