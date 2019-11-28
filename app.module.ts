import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';
import { HammerGestureConfig } from "@angular/platform-browser";
import { UsuarioService } from './usuario.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';



const firebaseAppConfig:FirebaseAppConfig={
  apiKey: "AIzaSyAGQTspbtld1Yh1Cax5J1Ojs94gporAnA0",
  authDomain: "camelo-4b074.firebaseapp.com",
  databaseURL: "https://camelo-4b074.firebaseio.com",
  projectId: "camelo-4b074",
  storageBucket: "camelo-4b074.appspot.com",
  messagingSenderId: "1032192029495"
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseAppConfig),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFireDatabase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{     provide: UsuarioService,
      useClass: HammerGestureConfig}


  ],
  bootstrap: [AppComponent]

})
export class AppModule {}
