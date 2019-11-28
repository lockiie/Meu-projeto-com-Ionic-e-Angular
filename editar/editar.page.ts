import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { EditarService } from '../editar.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  title
  boxlist
  formcadproduto : FormGroup
  constructor(private router : Router,private db : AngularFireDatabase, public provider : UserService,
    private formbuilder: FormBuilder,private toastController: ToastController, 
    private loadingController: LoadingController, public edit: EditarService,
    ) {
      this.formcadproduto = this.formbuilder.group({
        nome: [this.edit.nome, [Validators.required, Validators.minLength(1)]], 
        pg : [this.edit.precopago, [Validators.required, Validators.minLength(1)]],   
        pm : [this.edit.precominimo, [Validators.required, Validators.minLength(1)]],
        descricao : [this.edit.descricao], 
        quantidade: [this.edit.quantidade, [Validators.required, Validators.minLength(1), Validators.min(this.edit.quantidade)]],
        box : [this.edit.box, [Validators.required, Validators.minLength(1)]]
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
  async editar(){
    var loader  = await this.loadingController.create({
      message: 'Espere, por favor ...'
    })
    await loader.present();
    if(this.formcadproduto.value.quantidade > this.edit.quantidade){
    let novaquantidade = this.formcadproduto.value.quantidade - this.edit.quantidade
    let valortotal = novaquantidade * this.formcadproduto.value.pg
    this.db.database.ref('/controlecompras').child(this.provider.del).child(this.provider.idempre).push({
      nome : this.provider.nome,   
      nomeproduto : this.formcadproduto.value.nome,
      quantidade : novaquantidade,
      precopago : this.formcadproduto.value.pg,
    }).catch(()=>{
      loader.dismiss()
this.title = "Erro ao Editar"
this.presentToast()
    }).then(()=>{
      let listDB = this.db.database.ref('/Lucro').child(this.provider.del).child(this.provider.idempre).child(this.provider.id)
          listDB.once('value', (snapshot) =>{
            const items = snapshot.val();
            if(items){
           let qntcompra = Number(items.qcompra) + novaquantidade;
           var total = Number(items.total) - valortotal;
           let totalcompra = Number(items.tcompra) + valortotal
           listDB.update({
           total : total,
           qcompra : qntcompra,   
          tcompra : totalcompra    
              })
            }else{
              var total = valortotal  * -1;
               listDB.set({
                qcompra : novaquantidade, 
                tcompra : valortotal,    
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
      this.db.database.ref('/produtos').child(this.provider.idempre).child(this.formcadproduto.value.box).child(this.edit.id).update({
        nome : this.formcadproduto.value.nome.toUpperCase(),
        quantidade : this.formcadproduto.value.quantidade,
        precopago : this.formcadproduto.value.pg,
        precominimo : this.formcadproduto.value.pm,
        descricao: this.formcadproduto.value.descricao
    }).then(()=>{
      this.title = "Produto Editado"
loader.dismiss()
this.router.navigate(['/home'])
this.presentToast()

    })
  })

    }else{
      if(this.formcadproduto.value.quantidade < this.edit.quantidade){
      this.db.database.ref('/produtos').child(this.provider.idempre).child(this.formcadproduto.value.box).child(this.edit.id).update({
        nome : this.formcadproduto.value.nome.toUpperCase(),
        quantidade : this.edit.quantidade,
        precopago : this.formcadproduto.value.pg,
        precominimo : this.formcadproduto.value.pm,
        descricao: this.formcadproduto.value.descricao,
   
}).then(()=>{
this.title = "Produto Editado"
loader.dismiss()
this.router.navigate(['/home'])
this.presentToast()
}).catch(() => {
loader.dismiss()
this.title = "Erro ao Editar"
this.presentToast()
})

    }else{
      loader.dismiss()
this.title = "Quantidade Inválida"
this.presentToast()
    
    }
  }
}

}
