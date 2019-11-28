import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { EditarfuncionarioService } from '../editarfuncionario.service';

@Component({
  selector: 'app-cadfuncionario',
  templateUrl: './cadfuncionario.page.html',
  styleUrls: ['./cadfuncionario.page.scss'],
})
export class CadfuncionarioPage implements OnInit {
  boxlist =[]
  form: FormGroup
  title
  formedit: FormGroup
  dados
  constructor(private router : Router,private db : AngularFireDatabase, public provider : UserService,
    private formbuilder: FormBuilder,private toastController: ToastController,private afAuth: AngularFireAuth,
    private loadingController: LoadingController, public editar : EditarfuncionarioService) { 
      this.form = this.formbuilder.group({
        nome: [null, [Validators.required, Validators.minLength(1)]],
        email : [null, [Validators.required, Validators.minLength(1)]],   
        celular : [null, [Validators.required, Validators.minLength(1)]],
        senha : [null, [Validators.required, Validators.minLength(6)]],
        confirmarsenha : [null, [Validators.required, Validators.minLength(6)]],  
        box : [null, [Validators.required, Validators.minLength(1)]],
        estoque : [false],
        controle : [false],
        funcionario : [false]
      })
      if(editar.dados){
        this.formedit = this.formbuilder.group({
          nome: [this.editar.dados.nome, [Validators.required, Validators.minLength(1)]],
          celular : [this.editar.dados.celular, [Validators.required, Validators.minLength(1)]],
          senha : [this.editar.dados.senha, [Validators.required, Validators.minLength(6)]],
          confirmarsenha : [this.editar.dados.senha, [Validators.required, Validators.minLength(6)]],  
          box : [this.editar.dados.box, [Validators.required, Validators.minLength(1)]],
          estoque : [this.editar.dados.estoque],
          controle : [this.editar.dados.controle],
          funcionario : [this.editar.dados.funcionario]
        })
      this.dados = editar.dados
      }
    }

  ngOnInit() {
    this.box()
  }
  box(){
    let listDB = this.db.database.ref('/Box').child(this.provider.idempre)
    listDB.once('value', (snapshot) =>{
      const items = snapshot.val();
      if(items){
        this.boxlist = Object.keys(items).map(i => items[i]) 
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
  async editfuncionario(){
    if(this.form.value.senha == this.form.value.confirmarsenha){
      var loader  = await this.loadingController.create({
        message: 'Espere, por favor ...'
      })
      await loader.present();
    var editar = this.editar.dados 
    if(editar.senha != this.form.value.senha){
      this.afAuth.auth.signInWithEmailAndPassword(editar.email, editar.senha).then(()=>{
        this.afAuth.auth.currentUser.updatePassword(this.formedit.value.senha)
      }) .catch(()=>{
        this.title = "Erro ao mudar senha"
        loader.dismiss()
        this.presentToast();
      })
    }
        this.db.database.ref('usuario/' + editar.id).update({
        nome: this.formedit.value.nome,
        email:editar.email,
        celular: this.formedit.value.celular,
        senha:this.formedit.value.senha,
        confirmarsenha:this.formedit.value.confirmarsenha,
        box:this.formedit.value.box,
        estoque:this.formedit.value.estoque,
        controle:this.formedit.value.controle,
        funcionario:this.formedit.value.funcionario,

      }).then(()=>{
        this.title = "Funcionário editado com sucesso!"
        this.router.navigate(['/funcionario'])
        loader.dismiss()
        this.editar.dados = undefined
        this.presentToast()
      })
    .catch(()=>{
          this.title = "Email inválido"
          loader.dismiss()
          this.presentToast()
        })
  }else{
    this.title = "Senhas não se combinam"
        this.presentToast()
  }
}


  async cadfuncionario(){
    if(this.form.value.senha == this.form.value.confirmarsenha){
      var loader  = await this.loadingController.create({
        message: 'Espere, por favor ...'
      })
      await loader.present();
  this.afAuth.auth.createUserWithEmailAndPassword(
    this.form.value.email, this.form.value.senha)
    .then((response) => {
      this.db.database.ref('usuario/' + response.user.uid).set({
    nome: this.form.value.nome,
    email:this.form.value.email,
    celular: this.form.value.celular,
    senha:this.form.value.senha,
    box:this.form.value.box,
    estoque:this.form.value.estoque,
    controle:this.form.value.controle,
    funcionario:this.form.value.funcionario,
    idempre: this.provider.idempre,
    nomeempresa: this.provider.nomedaempresa
  }).then(()=>{
    this.title = "Funcionário cadastrado com sucesso!"
    this.router.navigate(['/funcionario'])
    loader.dismiss()
    this.presentToast()
  })
    }).catch(()=>{
      this.title = "Email já existente"
      loader.dismiss()
      this.presentToast()
    })

   }else{
        this.title = "Senhas não se combinam"
        this.presentToast()
        }

  }







}
