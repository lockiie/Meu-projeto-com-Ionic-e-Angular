import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { VenderService } from '../vender.service';

@Component({
  selector: 'app-cadprejuizo',
  templateUrl: './cadprejuizo.page.html',
  styleUrls: ['./cadprejuizo.page.scss'],
})
export class CadprejuizoPage implements OnInit {
  form : FormGroup
  title
  constructor(private router : Router,private db : AngularFireDatabase, public provider : UserService,
    private formbuilder: FormBuilder,private toastController: ToastController, 
    private loadingController: LoadingController,public vender : VenderService) {
      this.form = this.formbuilder.group({
        descricao : [null],
        quantidade : [null, [Validators.required, Validators.minLength(1)]], 
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
    if(this.form.value.quantidade  <= this.vender.quantidadeprejuizo){
    var loader  = await this.loadingController.create({
      message: 'Espere, por favor ...'
    })
    await loader.present();
    var valor = this.vender.precoprejuizo * this.form.value.quantidade
    this.db.database.ref('/prejuizos').child(this.provider.del).child(this.provider.idempre)
    .push({
      nome: this.vender.nomeprejuizo,
      dia: this.provider.dia,
      descricao: this.form.value.descricao,
      valor: this.vender.precoprejuizo,
      quantidade: this.form.value.quantidade,
      idproduto:this.vender.idprejuizo, boxproduto:this.vender.boxprejuizo,
    descricaoproduto: this.vender.descricao, precominimo: this.vender.precominimo}).then(()=>{
      let quantidade = this.vender.quantidadeprejuizo - this.form.value.quantidade
      this.db.database.ref('/produtos').child(this.provider.idempre).child(this.vender.boxprejuizo).child(this.vender.idprejuizo)
      .update({
        quantidade : quantidade
      })
      let listDB = this.db.database.ref('/Lucro').child(this.provider.del).child(this.provider.idempre).child(this.provider.id)
      listDB.once('value', (snapshot) =>{
      const items = snapshot.val();
       if(items){
     var total = items.total - valor;
     var projuizo = valor + items.prejuizo
     listDB.update({
       total   : total,
       prejuizo : projuizo,   
       })
       }else{       
         var prejuizo = valor * -1
         listDB.set({
           qcompra : 0, 
           tcompra : 0,    
           total: prejuizo,
           qvenda: 0,
           tvenda: 0,
           cartao: 0,
           despesas: 0,
           prejuizo: valor
       })    
      }
    }).then(()=>{
      this.form = this.formbuilder.group({
        descricao : "",
        quantidade : "" 
        })
      this.title = "Prejuizo Cadastrado com Sucesso!"
      loader.dismiss()
      this.presentToast()
      this.router.navigate(['/prejuizo'])
    })
    .catch(()=>{
      this.title = "Erro ao Cadastrar!"
      loader.dismiss()
      this.presentToast()
    })

  })
}else{
  this.title = "Quantidade incorreta"
      this.presentToast()

}
}

}
