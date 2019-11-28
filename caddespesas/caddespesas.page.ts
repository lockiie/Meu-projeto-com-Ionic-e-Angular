import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-caddespesas',
  templateUrl: './caddespesas.page.html',
  styleUrls: ['./caddespesas.page.scss'],
})
export class CaddespesasPage implements OnInit {
form : FormGroup
title

  constructor(private router : Router, private formbuilder: FormBuilder,private db : AngularFireDatabase,
    public provider : UserService,private toastController: ToastController, 
     private loadingController: LoadingController) { 
  
    this.form = this.formbuilder.group({
      nome: [null, [Validators.required, Validators.minLength(1)]],
      tipo : [null, [Validators.required, Validators.minLength(1)]],   
      valor : [null, [Validators.required, Validators.minLength(1)]],
    })
   
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.title,
      duration: 2000
    });
    toast.present();
  }
  
  ngOnInit() {
  }
  async cadastrar(){
     var loader  = await this.loadingController.create({
      message: 'Espere, por favor ...'
    })
    await loader.present();
    let mes = this.provider.mes - 1
    if(mes == - 1){
      mes = 11
    }
    this.db.database.ref('/despesasmensais').child(this.provider.idempre).push({
      nome: this.form.value.nome,
      valor: this.form.value.valor,
      tipo : this.form.value.tipo,
      mes: mes
    }).then(()=>{
      this.title = "Despesa Cadastrada com Sucesso!"
      loader.dismiss()
      this.presentToast()
      this.router.navigate(['/despesasmensais'])
    }).catch(()=>{
      this.title = "Erro ao Cadastrar!"
      loader.dismiss()
      this.presentToast()
    })

      }

}
