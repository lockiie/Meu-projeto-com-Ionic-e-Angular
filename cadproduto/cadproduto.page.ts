import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cadproduto',
  templateUrl: './cadproduto.page.html',
  styleUrls: ['./cadproduto.page.scss'],
})
export class CadprodutoPage implements OnInit {
  title
  boxlist
  formcadproduto : FormGroup
  manter = false
  constructor(private router : Router,private db : AngularFireDatabase, public provider : UserService,
    private formbuilder: FormBuilder,private toastController: ToastController, 
    private loadingController: LoadingController,
    ) {
      this.formcadproduto = this.formbuilder.group({
        nome: [null, [Validators.required, Validators.minLength(1)]],
        pg : [null, [Validators.required, Validators.minLength(1)]],   
        pm : [null, [Validators.required, Validators.minLength(1)]],
        quantidade : [null, [Validators.required, Validators.minLength(1)]], 
        descricao : [null, [Validators.required, Validators.minLength(1)]], 
        box : [null, [Validators.required, Validators.minLength(1)]]

      })
     }

  ngOnInit() {
    this.box()
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.title,
      duration: 2000
    });
    toast.present();
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
  async cadproduto(){
    var loader  = await this.loadingController.create({
      message: 'Espere, por favor ...'
    })
    await loader.present();
    this.db.database.ref('/produtos').child(this.provider.idempre).child(this.formcadproduto.value.box).push({
      nome : this.formcadproduto.value.nome.toUpperCase(),
      quantidade : this.formcadproduto.value.quantidade,
      precopago : this.formcadproduto.value.pg,
      precominimo : this.formcadproduto.value.pm,
      descricao: this.formcadproduto.value.descricao,
    }).then(()=>{
      this.db.database.ref('/controlecompras').child(this.provider.del).child(this.provider.idempre).push({
      nome : this.provider.nome,   
      nomeproduto : this.formcadproduto.value.nome,
      quantidade : this.formcadproduto.value.quantidade,
      precopago : this.formcadproduto.value.pg,
   })
  }).then(()=>{
    var qcompra = Number(this.formcadproduto.value.quantidade)
    var tcompra = Number(this.formcadproduto.value.quantidade * this.formcadproduto.value.pg)
      let listDB = this.db.database.ref('/Lucro').child(this.provider.del).child(this.provider.idempre).child(this.provider.id)
          listDB.once('value', (snapshot) =>{
            const items = snapshot.val();
            if(items){
           let qntcompra = Number(items.qcompra) + qcompra;
           var total = Number(items.total) - tcompra;
           let totalcompra = Number(items.tcompra) + tcompra
           listDB.update({
           total : total,
           qcompra : qntcompra,   
          tcompra : totalcompra    
              })
            }else{
              var total = tcompra  * -1;
               listDB.set({
                qcompra : qcompra, 
                tcompra : tcompra,    
                total: total,
                qvenda: 0,
                tvenda: 0,
                cartao: 0,
                despesas: 0,
                prejuizo: 0
              })
            }
          })
}).then(()=>{
this.limparcampos()
this.title = "Produto Cadastrado"
loader.dismiss()
if(this.manter == false){
  this.router.navigate(['/home'])
}
 this.presentToast()
}).catch(() => {
  loader.dismiss()

this.title = "Erro ao cadastrar"
this.presentToast()
})

}
limparcampos(){
  this.formcadproduto = this.formbuilder.group({
    nome : "",
    pg : "",
    pm : "",
    quantidade : "",
    descricao : "",
    box : "",

    })
}
}
