import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { AlertController, ActionSheetController, ToastController} from '@ionic/angular';
import { VenderService } from '../vender.service';
import { ModelocarrinhoService } from '../modelocarrinho.service';
import { EditarService } from '../editar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
title
val
procurarlist
produtoslist
boxlist
teste = true;
ngbox = this.provider.box
addcarrinho = false

  constructor(public edit : EditarService, private carrinho : ModelocarrinhoService,private actionSheetController: ActionSheetController,
    private router : Router,private db : AngularFireDatabase, 
    public provider : UserService, private alertController: AlertController,
    private toastController: ToastController, public vender : VenderService) {
    this.boxlist = [""]
    this.box()
    this.produtos()
  }
   ionViewWillEnter(){
     if(this.carrinho.itemcarrinho || this.edit.nome){
    for(let index = 0, total = this.carrinho.itemcarrinho.length; index < total; index++){
      document.getElementById(this.carrinho.itemcarrinho[index].id).setAttribute("color", "normal")
    }
    this.carrinho.itemcarrinho = []
    this.addcarrinho = false;
    this.carrinho.itemcarrinho = []
  }
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
adicionaraocarrinho(item){
 let encontrou = false;
for(let index = 0, total = this.carrinho.itemcarrinho.length; index < total; index++){
let obj = this.carrinho.itemcarrinho[index].id;
if(obj == item.id){
    encontrou = true;
    for(let index = 0, total = this.carrinho.itemcarrinho.length; index < total; index++){
      document.getElementById(this.carrinho.itemcarrinho[index].id).setAttribute("color", "normal")
    }
    this.carrinho.itemcarrinho = []
    this.addcarrinho = false;
}
}
if(encontrou == false){
  this.addcarrinho = true
  this.carrinho.addcarinho = true
  this.carrinho.itemcarrinho.push({id: item.id,box: this.ngbox,precopago: item.precopago,
    nome: item.nome,precominimo: item.precominimo, quantidade: item.quantidade, venderquantidade : undefined,
     venderpreco: item.precominimo, descricao: item.descricao})
  document.getElementById(item.id).setAttribute("color", "light")
}
 
  }
  editar(item){
   this.edit.nome = item.nome
   this.edit.descricao = item.descricao
   this.edit.precominimo= item.precominimo
   this.edit.precopago = item.precopago
   this.edit.quantidade = item.quantidade
   this.edit.id = item.id
   this.edit.box = this.ngbox
   this.router.navigate(['/editar'])
  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [ {
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.editar(item)

        }
      }, {
        text: 'Desfazer',
        icon: 'trash',
        handler: () => {
          this.desfazer(item)       
         }
      },{
        text: 'Adicionar como prejuízo',
        icon: 'trending-down',
        handler: () => {
          this.vender.nomeprejuizo = item.nome
          this.vender.precoprejuizo = item.precopago
          this.vender.quantidadeprejuizo = item.quantidade
          this.vender.idprejuizo = item.id
          this.vender.precominimo = item.precominimo
          this.vender.descricao = item.descricao
          this.vender.boxprejuizo = this.ngbox

          this.router.navigate(['/cadprejuizo'])
        }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }


  produtos(){
        this.produtoslist = undefined
        let x = this.ngbox.toString();
        let listDB = this.db.database.ref('/produtos').child(this.provider.idempre).child(this.ngbox)
        listDB.on('value', (snapshot) =>{
          const items = snapshot.val();
          if(items){
            this.produtoslist = Object.keys(items).map(i => {items[i].id = i; return items[i] });   
            this.procurarlist = this.produtoslist       
          }else{
            this.produtoslist = 1
          } 
        }) 
  }
  procurarprodutos(){
    if(this.produtoslist){
      if (this.val && this.val.trim() != '') {
        this.produtoslist = this.produtoslist.filter((item) => {
          return (item.nome.toLowerCase().indexOf(this.val.toLowerCase()) > -1);
        })
      }else{
        this.produtoslist = this.procurarlist
         }
    }
  }
  async desfazer(item){
    const alert = await this.alertController.create({
      header: 'Tem certeza que deseja desfazer o produto ' + item.nome,
      message: 'Isso ira retirar o produto do "Estoque" e devolver o dinheiro de compra para o "Controle de Compras e Vendas"',
      buttons: [
        {
          text: 'Cancelar'
        },
      {
        text: 'Desfazer',
          handler: () => {
            if(item.quantidade > 0 ){
                let listDB = this.db.database.ref('/Lucro').child(this.provider.del).child(this.provider.idempre).child(this.provider.id)
                listDB.once('value', (snapshot) =>{
                const items = snapshot.val();
                var total = item.quantidade * item.precopago
                 if(items){
               var qntcompra = items.qcompra - item.quantidade
               var totalcompra = items.tcompra + (total * -1) ;
               var totall = items.total + total
               listDB.update({
                qcompra   : qntcompra,
                tcompra : totalcompra,   
                total : totall        
                 })
                 }else{       
                   var tcompra = total * -1
                   listDB.set({
                   qcompra : item.quantidade , 
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
              this.db.database.ref('produtos/').child(this.provider.idempre).child(this.ngbox).child(item.id).remove()
            }else{
              this.db.database.ref('produtos/').child(this.provider.idempre).child(this.ngbox).child(item.id).remove()
            }
            this.title = "Produto Desfeito com Sucesso"
            this.presentToast()
            }
          }
      ]
    });
    await alert.present();
  }
  
}
