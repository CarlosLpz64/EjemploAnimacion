import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/paginas/login/login.component';
import { RegistrarseComponent } from './components/paginas/registrarse/registrarse.component';
import { JuegoComponent } from './components/paginas/juego/juego.component';
import { SesionesComponent } from './components/paginas/sesiones/sesiones.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrarseComponent,
    JuegoComponent,
    SesionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
