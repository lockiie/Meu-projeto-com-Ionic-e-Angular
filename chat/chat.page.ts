import { Component, ViewChild} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from '../user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage   {
 
novamensagem = ''
mensagens
teste = ""
month
limite = 30
@ViewChild('lista', {static: false}) private lista: any;
@ViewChild('content', {static: false}) private content: any;


  constructor(
    public provider : UserService, private db : AngularFireDatabase,) {
    this.month = new Array();
    this.month[0] = "Janeiro";
    this.month[1] = "Fevereiro";
    this.month[2] = "Marco";
    this.month[3] = "Abril";
    this.month[4] = "Maio";
    this.month[5] = "Junho";
    this.month[6] = "Julho";
    this.month[7] = "Agosto";
    this.month[8] = "Setembro";
    this.month[9] = "Outubro";
    this.month[10] = "Novembro";
    this.month[11] = "Dezembro";
   }
async ionViewWillEnter(){
  this.getmensagens()
  if(this.content){
    this.content.scrollToBottom(0);
  }
}
  scrollToBottom(){
    if(this.lista){
      if(this.limite == 30 ){
        this.content.scrollToBottom(0).then(()=>{
          document.getElementById('14').style.display = "block";
        })
      }
    }else{
      setTimeout(() => {
        this.scrollToBottom()
    }, 500);
    }
  }

  getmensagens() {
      let listDB = this.db.database.ref('/Chat').child(this.provider.idempre).limitToLast(this.limite)
      listDB.on('value', (snapshot) =>{
            const items = snapshot.val();
            if(items){
              this.mensagens = ""
              this.mensagens = Object.keys(items).map(i => items[i])
              let data
              let id
              this.scrollToBottom()
              for(let index = 0, total = this.mensagens.length; index < total; index++){
                if(this.mensagens[index].data != data){
               data = this.mensagens[index].data
                }else{
                  delete this.mensagens[index].data;
                }
                if(this.mensagens[index].id != id){
                  id = this.mensagens[index].id
                }else {
                  delete this.mensagens[index].nome
                }            }

            }else{
              this.mensagens = 1
            }

            })

  }
  mensagem(){
    var d = new Date();
    var n = this.month[d.getMonth()];
let hora = d.getHours();
let min = d.getMinutes(); 
let horamin = hora + ":" + min
let dia  = d.getDate().toString(),
diaF = (dia.length == 1) ? '0'+ dia : dia,
anoF = d.getFullYear();
let dataformata = diaF+"/"+ n +"/"+anoF;
this.db.database.ref('/Chat').child(this.provider.idempre).push({
      mensagem : this.novamensagem,
      hora: horamin,
      nome: this.provider.nome,
      data: dataformata,
      id : this.provider.id
    }).then(()=>{
      this.content.scrollToBottom(0);

      })
    }
  

 



}
