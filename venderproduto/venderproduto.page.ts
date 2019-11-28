import { Component, OnInit } from '@angular/core';
import { VenderService } from '../vender.service';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-venderproduto',
  templateUrl: './venderproduto.page.html',
  styleUrls: ['./venderproduto.page.scss'],
})
export class VenderprodutoPage implements OnInit {
contas
title
receber: FormGroup
dia = new Date().getDate()
vendercadastrarcliente: FormGroup
tipovenda
form : FormGroup
  constructor(public provider : VenderService,private formbuilder: FormBuilder,
    private toastController: ToastController, private loadingController: LoadingController,
    private db : AngularFireDatabase, public user : UserService, private router : Router
    ,private alertController: AlertController) {
      this.listarcontas()
      this.form = this.formbuilder.group({
        valor: [this.provider.preco - this.provider.recebido , [Validators.required, Validators.minLength(1),Validators.min(0), Validators.max(provider.preco)]],

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

  listarcontas(){
    let listDB = this.db.database.ref('/clientes').child(this.user.idempre).child(this.provider.id).child('vendas')
    listDB.once('value', (snapshot) =>{
      const items = snapshot.val();
      if(items){
       this.contas = Object.keys(items).map(i => {items[i].id = i; return items[i]});  
       this.contas.reverse()
      }else{
       this.contas = 1
      }
  })
}
async dinheiro(){
  var loader  = await this.loadingController.create({
    message: 'Espere, por favor ...'
  })
  await loader.present();
let precoquedeve = this.provider.preco - this.provider.recebido

  if(this.form.value.valor < precoquedeve){
    if(this.tipovenda == 'dinheiro'){
      let listDB = this.db.database.ref('/clientes').child(this.user.idempre).child(this.provider.id)
      let diminuirconta = this.provider.recebido + this.form.value.valor
      listDB.update({
        recebido: diminuirconta
      }).catch(()=>{
        this.title = "Erro ao receber"
        loader.dismiss()
      })
      .then(()=>{
        this.title = "Recebido Com Sucesso"
        loader.dismiss()
        this.presentToast()
        this.router.navigate(['/contasareceber'])})
    }else{
      let listDB = this.db.database.ref('/clientes').child(this.user.idempre).child(this.provider.id)
      let diminuirconta = this.provider.recebido + this.form.value.valor
      listDB.update({
        recebidocartao: diminuirconta,
        recebido:diminuirconta
      }).catch(()=>{
        this.title = "Erro ao receber"
        loader.dismiss()
      }).then(()=>{
        this.title = "Recebido Com Sucesso"
        loader.dismiss()
        this.presentToast()
        this.router.navigate(['/contasareceber'])
      })
    }
  }else if (this.form.value.valor > precoquedeve){
    this.title = "Valor está acima do que é o certo"
    this.presentToast()
    loader.dismiss()


  }else if(precoquedeve == this.form.value.valor){
    var quantidadedeprodutos = 0
    let controledevendas =  this.db.database.ref('/controlevendas').child(this.user.del).child(this.user.idempre)
    for(let index = 0, total = this.contas.length; index < total; index++){
      controledevendas.push({
        nome : this.user.nome,
        quantidade : this.contas[index].quantidade,
        nomeproduto :  this.contas[index].nomeproduto,
        preco: this.contas[index].preco,
        dia: this.dia,
        precopago : this.contas[index].precopago,
        precominimo : this.contas[index].precominimo,
        descricao: this.contas[index].descricao,
        pagamento: this.tipovenda,
        idproduto: this.contas[index].id,
        box: this.contas[index].box
     }).catch(()=>{
      this.title = "Erro ao receber"
      loader.dismiss()
     })
     quantidadedeprodutos += this.contas[index].quantidade
    }

    let caminho = this.db.database.ref('/Lucro').child(this.user.del).child(this.user.idempre).child(this.user.id)
    caminho.once('value', (snapshot) =>{
    const items = snapshot.val();
    if(this.tipovenda == 'dinheiro'){
      if(items){
        let qvenda = items.qvenda + quantidadedeprodutos
        let tvenda = items.tvenda + this.provider.preco
        let total = items.total + this.provider.preco
         caminho.update({
           total: total,
           tvenda: tvenda,
           qvenda : qvenda
         })
        }else{
          caminho.set({
            total: this.provider.preco,
            tvenda: this.provider.preco,
            qcompra: 0,
            tcompra: 0,
            cartao: 0,
            despesas: 0,
            prejuizo: 0,
            qvenda: quantidadedeprodutos,
          })
        }
    }else{
      if(items){
       let qvenda = items.qvenda + quantidadedeprodutos
       let tvenda = items.tvenda + this.provider.preco
       let total = items.total + this.provider.preco
       let cartao = items.cartao + this.provider.recebidocartao + this.form.value.valor
        caminho.update({
          cartao: cartao,
          total: total,
          tvenda: tvenda,
          qvenda : qvenda
        })
      }else{
        let cartao = this.provider.recebidocartao + this.form.value.valor
        caminho.set({
          total: this.provider.preco,
          tvenda: this.provider.preco,
          qcompra: 0,
          tcompra: 0,
          cartao: cartao,
          despesas: 0,
          prejuizo: 0,
          qvenda: quantidadedeprodutos,
        })
      }
    }
    let listDB = this.db.database.ref('/clientes').child(this.user.idempre).child(this.provider.id)
    listDB.update({
      preco :0,
      recebido :0,
      recebidocartao:0
    })
    listDB.child('vendas').remove()
  .then(()=>{
    this.title = "Recebido Com Sucesso"
    loader.dismiss()
    this.presentToast()
    this.router.navigate(['/contasareceber'])
  })
    })
  }
}

async desfazer(item){
  const alert = await this.alertController.create({
    header: 'Desfazer Venda',
    message: 'Isso ir desfazer sua Venda',
    buttons: [
      {
        text: 'Cancelar',
        handler: (blah) => {
        }
      }, {
        text: 'Desfazer',
        handler: () => {
          this.desfazermetodo(item)
        }
      }
    ]
  });

  await alert.present();

}

async desfazermetodo(item){
  var loader  = await this.loadingController.create({
    message: 'Espere, por favor ...'
  })
  await loader.present();
var dinheiroproduto = item.quantidade * item.preco
let novopreco = this.provider.preco - dinheiroproduto
if(novopreco >= 0){
  this.db.database.ref('/clientes').child(this.user.idempre).child(this.provider.id).update({
    preco: novopreco
  })
}else{
  this.db.database.ref('/clientes').child(this.user.idempre).child(this.provider.id).update({
    preco: 0,
    recebido: 0
  })
}
let listDB = this.db.database.ref('/produtos').child(this.user.idempre).child(item.box).child(item.idproduto)
listDB.once('value', (snapshot) =>{
  const items = snapshot.val();
  if(items){
    let quantidadetotal = items.quantidade + item.quantidade
    listDB.update({
      quantidade : quantidadetotal,
    })
  }else{
    listDB.set({
      nome : item.nomeproduto,
      quantidade : item.quantidade,
      precopago : item.precopago,
      precominimo : item.precominimo,
      descricao: item.descricao,
    })
  }
})
this.db.database.ref('/clientes').child(this.user.idempre).child(this.provider.id).child('vendas').child(item.id).remove()
this.listarcontas()
this.title = "Venda desfeita com Sucesso!"
loader.dismiss()
this.presentToast()
}

 

}

