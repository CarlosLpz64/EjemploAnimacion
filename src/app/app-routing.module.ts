import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegoComponent } from './components/paginas/juego/juego.component';
import { LoginComponent } from './components/paginas/login/login.component';
import { RegistrarseComponent } from './components/paginas/registrarse/registrarse.component';
import { SesionesComponent } from './components/paginas/sesiones/sesiones.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'juego', component: JuegoComponent},
  {path: 'elegir', component: SesionesComponent},
  {path: '**', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
