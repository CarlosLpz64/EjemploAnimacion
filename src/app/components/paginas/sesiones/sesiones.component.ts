import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SesionesService } from 'src/app/services/sesiones.service';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {

  constructor(private router: Router,
    private miService:SesionesService,
    private cookie: CookieService) { }

  ListaSesiones: any[] = [];
  ListaSesiones2: any[] = [];

  miForm = new FormGroup({
    cant_jugadores : new FormControl('', [Validators.required]),
    pantalla : new FormControl('', [Validators.required])
  });

  get f(): { [key: string]: AbstractControl} {return this.miForm.controls; }


  ngOnInit(): void {
    this.cargarInfo()
  }

  crearPartida(){
    if (this.miForm.valid){
      const miRequest = {
        'cant_jugadores':this.f['cant_jugadores'].value, 
        'pantalla':this.f['pantalla'].value 
      }
      console.log(miRequest);

      this.miService.crearSesion(miRequest).subscribe({
        next: (r) => [
        console.log("Respuesta: " + r),
        this.cookie.set("Rol", "host"),
        this.cookie.set("Pantalla", this.f['pantalla'].value),
        this.cookie.set("Sesion", r.data.toString()),
        this.apartarPantalla(),
        //this.router.navigate(['/juego']),
        this.cargarInfo()
      ],
        error: (e) => [console.error(e)],
        complete: () => [console.info('complete')]
    })
    }
  }

  generarLista(){
    this.ListaSesiones2 = []

    this.ListaSesiones.forEach(element => {
      var aux = {
        "id": element.id,
        "host_id": element.host_id,
        "cant_jugadores": element.cant_jugadores,
        "estado": element.estado,
        "pantallas": this.generarPantallas(element.cant_jugadores)
      }

      this.ListaSesiones2.push(aux)
    });

    console.log(this.ListaSesiones2)

  }

  generarPantallas(cant:number){
      var i:number = 1;
      var aux = []

      while (i <= cant){
        aux.push(i)
        i++;
      }

      return aux;

  }

  cargarInfo(){
    
    this.miService.index().subscribe({
      next: (r) => [
      console.log(r.data),
      this.ListaSesiones = r.data,
      this.generarLista()
    ],
      error: (e) => [console.error(e)],
      complete: () => console.info('complete') 
    })
    
  }

  seleccionarSesion(id: number, pantalla:number){
    this.cookie.set("Pantalla", pantalla.toString())
    this.cookie.set("Sesion", id.toString())
    this.cookie.set("Rol", "invitado")
    this.apartarPantalla()
  }

  apartarPantalla(){
    const miRequest = {
      'sesion_id':this.cookie.get("Sesion"), 
      'posicion':this.cookie.get("Pantalla")
    }

    this.miService.unirse(miRequest).subscribe({
      next: (r) => [
      console.log("Respuesta: " + r.data),
      this.Redirigir(r.data)
      //this.router.navigate(['/juego']),
    ],
      error: (e) => [console.error(e)],
      complete: () => [console.info('complete')]
  })
  }

  Redirigir(data: boolean){
    if (data){
      this.router.navigate(['/juego'])
    }else{
      alert("La pantalla ya ha sido ocupada")
    }
  }
}
