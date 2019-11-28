import { Component, OnInit } from '@angular/core';
import { ModelocarrinhoService } from '../modelocarrinho.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController, LoadingController} from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carinho',
  templateUrl: './carinho.page.html',
  styleUrls: ['./carinho.page.scss'],
})
export class CarinhoPage implements OnInit {
  idcliente
  title
  formadepagamento
  venderaprazo = 0
  vendercadastrarcliente : FormGroup
  clientes
  dia = new Date().getDate()
  valortotal = 0
    constructor(public carrinho : ModelocarrinhoService,
    private toastController: ToastController, private loadingController: LoadingController
    ,private formbuilder: FormBuilder,private db : AngularFireDatabase,public user : UserService,
    private router : Router) {
      this.vendercadastrarcliente = this.formbuilder.group({
        nome: [null, [Validators.required, Validators.minLength(1)]],
        cpf : [null, [Validators.required, Validators.minLength(1)]],   
      })
      this.valortotal = 0
      this.calcular()
   }

  ngOnInit() {
    this.listarcliente() 
 
   }  
   ionViewDidEnter(){
    this.valortotal = 0
   }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.title,
      duration: 2000
    });
    toast.present();
  }
  listarcliente(){
    let listDB = this.db.database.ref('/clientes').child(this.user.idempre)
    listDB.once('value', (snapshot) =>{
      const items = snapshot.val();
      if(items){
       this.clientes = Object.keys(items).map(i => {items[i].id = i; return items[i]});  
      }
  })
}

 concluir(){
    this.title = "Venda feita com sucesso"
    this.presentToast()
    this.router.navigate(['/home'])

 }
 calcular(){
  this.valortotal = 0
  for(let index = 0, total = this.carrinho.itemcarrinho.length; index < total; index++){
    if(this.carrinho.itemcarrinho[index].venderquantidade){
    this.valortotal += (this.carrinho.itemcarrinho[index].venderpreco * this.carrinho.itemcarrinho[index].venderquantidade)
      }
    }
 }
  validar(){
    let verificar = false;
    var quantidadedevenda = 0
    var lucrototal = 0  
    for(let index = 0, total = this.carrinho.itemcarrinho.length; index < total; index++){
      if(this.carrinho.itemcarrinho[index].venderpreco < this.carrinho.itemcarrinho[index].precominimo ||
        this.carrinho.itemcarrinho[index].venderquantidade > this.carrinho.itemcarrinho[index].quantidade){
          this.title = "A quantidade é menor que o que você tem no esotoque ou o preço é menor que o ideal"
          this.presentToast() 
          verificar = true
           break
        }
        quantidadedevenda += this.carrinho.itemcarrinho[index].venderquantidade
        lucrototal += this.carrinho.itemcarrinho[index].venderquantidade * this.carrinho.itemcarrinho[index].venderpreco
   }
   if(verificar == false){
    if(this.formadepagamento == 'venderacartao' ){
      this.venderacartao(quantidadedevenda,lucrototal)
    }else if (this.formadepagamento == 'venderadinheiro'){
      this.venderadinheiro(quantidadedevenda,lucrototal)
    }else if (this.formadepagamento == 'venderjacadastrado'){
      this.venderjacadastrado(lucrototal)
    }else if (this.formadepagamento == 'vendercadastrar'){
       this.vendercadastrar(lucrototal)
    }
   }  }

   async venderacartao(quantidadedevenda,lucrototal){
      var loader  = await this.loadingController.create({
        message: 'Espere, por favor ...'
      })
      await loader.present();
    for(let index = 0, total = this.carrinho.itemcarrinho.length; index < total; index++){
    var xqvendaa = this.carrinho.itemcarrinho[index].venderquantidade
    this.db.database.ref('/controlevendas').child(this.user.del).child(this.user.idempre).push({
    nome : this.user.nome,
    quantidade : this.carrinho.itemcarrinho[index].venderquantidade,
    nomeproduto :  this.carrinho.itemcarrinho[index].nome,
    preco: this.carrinho.itemcarrinho[index].venderpreco,
    dia: this.dia,
    precopago : this.carrinho.itemcarrinho[index].precopago,
    precominimo : this.carrinho.itemcarrinho[index].precominimo,
    descricao: this.carrinho.itemcarrinho[index].descricao,
    pagamento: 'cartao',
    idproduto: this.carrinho.itemcarrinho[index].id,
    box: this.carrinho.itemcarrinho[index].box
   })
   .catch(()=>{
    loader.dismiss()
    this.title = "Erro ao cadastrar"
    this.presentToast();
            })
   .then(()=>{
   let quantidade = this.carrinho.itemcarrinho[index].quantidade - this.carrinho.itemcarrinho[index].venderquantidade
   this.db.database.ref('/produtos').child(this.user.idempre).child(this.carrinho.itemcarrinho[index].box).child(this.carrinho.itemcarrinho[index].id).update({
  quantidade: quantidade
    }) 
    })
   }
   let listDB = this.db.database.ref('/Lucro').child(this.user.del).child(this.user.idempre).child(this.user.id)
   listDB.once('value', (snapshot) =>{
   const items = snapshot.val();
    if(items){
  let qntvenda = items.qvenda + quantidadedevenda
  var totall = items.total + lucrototal;
  let xtvenda = items.tvenda + lucrototal
  var zcartao = items.cartao + lucrototal
  this.db.database.ref('/Lucro').child(this.user.del).child(this.user.idempre).child(this.user.id).update({
    total   : totall,
    qvenda : qntvenda,   
    tvenda : xtvenda,
    cartao : zcartao
    })
    }else{       
      this.db.database.ref('/Lucro').child(this.user.del).child(this.user.idempre).child(this.user.id).set({
      qcompra : 0, 
      tcompra : 0,    
      total: lucrototal,
      qvenda: xqvendaa,
      tvenda: lucrototal,
      cartao: lucrototal,
      despesas: 0,
      prejuizo: 0
    })    
  }                       
   }).then(()=>{
    this.concluir()
    loader.dismiss()

   })
   }

   async venderadinheiro(quantidadedevenda,lucrototal){
  var loader  = await this.loadingController.create({
    message: 'Espere, por favor ...'
  })
  await loader.present();
  for(let index = 0, total = this.carrinho.itemcarrinho.length; index < total; index++){
  var xqvendaa = this.carrinho.itemcarrinho[index].venderquantidade
  this.db.database.ref('/controlevendas').child(this.user.del).child(this.user.idempre).push({
    nome : this.user.nome,
    quantidade : this.carrinho.itemcarrinho[index].venderquantidade,
    nomeproduto :  this.carrinho.itemcarrinho[index].nome,
    preco: this.carrinho.itemcarrinho[index].venderpreco,
    dia: this.dia,
    precopago : this.carrinho.itemcarrinho[index].precopago,
    precominimo : this.carrinho.itemcarrinho[index].precominimo,
    descricao: this.carrinho.itemcarrinho[index].descricao,
    pagamento: 'dinheiro',
    idproduto: this.carrinho.itemcarrinho[index].id,
    box: this.carrinho.itemcarrinho[index].box
 }).then(()=>{
 let quantidade = this.carrinho.itemcarrinho[index].quantidade - this.carrinho.itemcarrinho[index].venderquantidade
 this.db.database.ref('/produtos').child(this.user.idempre).child(this.carrinho.itemcarrinho[index].box).child(this.carrinho.itemcarrinho[index].id).update({
quantidade: quantidade
  }) 
  })
 }
 let listDB = this.db.database.ref('/Lucro').child(this.user.del).child(this.user.idempre).child(this.user.id)
 listDB.once('value', (snapshot) =>{
 const items = snapshot.val();
  if(items){
let qntvenda = items.qvenda + quantidadedevenda
var totall = items.total + lucrototal;
let xtvenda = items.tvenda + lucrototal
this.db.database.ref('/Lucro').child(this.user.del).child(this.user.idempre).child(this.user.id).update({
  total   : totall,
  qvenda : qntvenda,   
  tvenda : xtvenda
  })
  }else{       
    this.db.database.ref('/Lucro').child(this.user.del).child(this.user.idempre).child(this.user.id).set({
      qcompra : 0, 
      tcompra : 0,    
      total: lucrototal,
      qvenda: xqvendaa,
      tvenda: lucrototal,
      cartao: 0,
      despesas: 0,
      prejuizo: 0
  })    
}          
}).then(()=>{
  loader.dismiss()
  this.concluir()
})
.catch(()=>{
  loader.dismiss()
  this.title = "Erro ao cadastrar"
  this.presentToast();
          })
}


async venderjacadastrado(lucrototal){
  var loader  = await this.loadingController.create({
    message: 'Espere, por favor ...'
  })
  await loader.present();
  var lucroquantidade = 0
  let listDB = this.db.database.ref('/clientes').child(this.user.idempre).child(this.idcliente)
  listDB.once('value', (snapshot) =>{
 const items = snapshot.val();
 if(items){  
  var cliente = Object.keys(items).map(i => items[i]);
  var valor = Number(cliente[2])}   
  var preco=  valor + lucrototal
  listDB.update({
    preco: preco
       })
       let data= this.dia +  "/" + this.user.mes + "/" +this.user.ano
       for(let index = 0, total = this.carrinho.itemcarrinho.length; index < total; index++){
        listDB.child('vendas').push({
          data: data,
          nome : this.user.nome,
          quantidade : this.carrinho.itemcarrinho[index].venderquantidade,
          nomeproduto :  this.carrinho.itemcarrinho[index].nome,
          preco: this.carrinho.itemcarrinho[index].venderpreco,
          precopago : this.carrinho.itemcarrinho[index].precopago,
          precominimo : this.carrinho.itemcarrinho[index].precominimo,
          descricao: this.carrinho.itemcarrinho[index].descricao,
          idproduto: this.carrinho.itemcarrinho[index].id,
          box: this.carrinho.itemcarrinho[index].box
        })
        lucroquantidade += this.carrinho.itemcarrinho[index].venderquantidade


        let quantidade = this.carrinho.itemcarrinho[index].quantidade - this.carrinho.itemcarrinho[index].venderquantidade
        this.db.database.ref('/produtos').child(this.user.idempre).child(this.carrinho.itemcarrinho[index].box).child(this.carrinho.itemcarrinho[index].id).update({
       quantidade: quantidade
         }) 
        }        
      }).then(()=>{ 
            loader.dismiss()
            this.concluir()
          })
          .catch(()=>{
            loader.dismiss()
   this.title = "Erro ao cadastrar"
            this.presentToast();
                    })
}

async vendercadastrar(lucrototal){
  var loader  = await this.loadingController.create({
    message: 'Espere, por favor ...'
  })
  await loader.present();
  var lucroquantidade = 0
  let listDB = this.db.database.ref('/clientes').child(this.user.idempre).orderByChild('cpf').equalTo(this.vendercadastrarcliente.value.cpf)
  listDB.once('value', (snapshot) =>{
  const items = snapshot.val();
   if(items){
    this.title = "Já existe um cliente cadastrado com esse CPF"
    loader.dismiss()

    this.presentToast() 
   }else{
    let listDB = this.db.database.ref('/clientes').child(this.user.idempre).orderByChild('nome').equalTo(this.vendercadastrarcliente.value.nome)
    listDB.once('value', (snapshot) =>{
    const items = snapshot.val();
    if(items){
      this.title = "Já existe um cliente cadastrado com esse nome"
      loader.dismiss()

    this.presentToast() 
    }else{
      this.db.database.ref('/clientes').child(this.user.idempre).push({
        nome: this.vendercadastrarcliente.value.nome,
        cpf: this.vendercadastrarcliente.value.cpf,
        preco: lucrototal,
        recebido: 0,
        recebidocartao : 0
      })

      .then((response) =>{
        let data= this.dia +  "/" + this.user.mes + "/" +this.user.ano
        for(let index = 0, total = this.carrinho.itemcarrinho.length; index < total; index++){
        this.db.database.ref('/clientes').child(this.user.idempre).child(response.key).child('vendas').push({
          data : data,
            nome : this.user.nome,
            quantidade : this.carrinho.itemcarrinho[index].venderquantidade,
            nomeproduto :  this.carrinho.itemcarrinho[index].nome,
            preco: this.carrinho.itemcarrinho[index].venderpreco,
            precopago : this.carrinho.itemcarrinho[index].precopago,
            precominimo : this.carrinho.itemcarrinho[index].precominimo,
            descricao: this.carrinho.itemcarrinho[index].descricao,
            idproduto: this.carrinho.itemcarrinho[index].id,
            box: this.carrinho.itemcarrinho[index].box
      })
      lucroquantidade += this.carrinho.itemcarrinho[index].venderquantidade

      let quantidade = this.carrinho.itemcarrinho[index].quantidade - this.carrinho.itemcarrinho[index].venderquantidade
      this.db.database.ref('/produtos').child(this.user.idempre).child(this.carrinho.itemcarrinho[index].box).child(this.carrinho.itemcarrinho[index].id).update({
     quantidade: quantidade
    })

  }}).then(()=>{
  loader.dismiss()
    this.concluir()
  })
  }
   })
}
}).catch(()=>{
  loader.dismiss()
this.title = "Erro ao cadastrar"
this.presentToast();
})
}



}
