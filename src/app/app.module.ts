import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Route,RouterModule} from '@angular/router'

import {AngularFireModule} from 'angularfire2'
import {AngularFireDatabaseModule} from 'angularfire2/database'
import {AngularFireAuthModule} from 'angularfire2/auth'

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MessageComponent } from './message/message.component';
import { SendmessageComponent } from './sendmessage/sendmessage.component';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { FeedsComponent } from './feeds/feeds.component';

import {environment} from '../environments/environment'

import {ChartService} from '../services/chat.service'
import {AuthService} from '../services/auth.service'

const routes:Route[]=[
  {path:'chat',component:ChatComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'',redirectTo:'chat',pathMatch:'full'}

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    MessageComponent,
    SendmessageComponent,
    ChatComponent,
    UsersComponent,
    FeedsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [ChartService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
