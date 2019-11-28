import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './user.service';
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    public provider : UserService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage : Storage,
    private router : Router,
    private db : AngularFireDatabase,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
  this.storage.get('user')
  .then((resolve)=>{
if (resolve){
  this.provider.id = resolve[0].id
  this.provider.idempre = resolve[0].idempre
  this.provider.nomedaempresa = resolve[0].nomeempresa
  this.provider.nome= resolve[0].nome
  this.provider.box = resolve[0].box
  this.provider.estoque = resolve[0].estoque
  this.provider.controle = resolve[0].controle
  this.provider.funcionario = resolve[0].funcionario
  this.router.navigate(['/index']).then(()=>{
    this.splashScreen.hide()
    let listDB = this.db.database.ref('/usuario').child(resolve[0].id)
    listDB.once('value', (snapshot) =>{
      const items = snapshot.val();
      let x = [items]
          if((x[0].nome != resolve[0].nome  || x[0].nomeempresa != resolve[0].nomeempresa
         || x[0].nomeempresa != resolve[0].nomeempresa || x[0].box != resolve[0].box
         || x[0].estoque != resolve[0].estoque || x[0].controle != resolve[0].controle
         || x[0].funcionario != resolve[0].funcionario) ){
        this.provider.idempre = items.idempre
        this.provider.nomedaempresa = items.nomeempresa
        this.provider.nome= items.nome
        this.provider.box = items.box
        this.provider.estoque = items.estoque
        this.provider.controle = items.controle
        this.provider.funcionario = items.funcionario
        this.storage.set('user', x)
      }
    })
  })

  }else{
    this.router.navigate(['/login']).then(()=>{
      this.splashScreen.hide()

    })

  }
}) 
})
  }
  }
