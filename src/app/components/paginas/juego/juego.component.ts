import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { CookieService } from 'ngx-cookie-service';
import { SesionesService } from 'src/app/services/sesiones.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
  animations: [
    

    trigger('moverBarco', [
      state('inicio', style({
        //marginLeft: '-20vw'
        transform: 'translateX(-100%)' 
      })),
      state('final', style({
        //marginLeft: '100vw'
        transform: 'translateX(500%)' 
      })),
      transition('inicio => final', [
        animate('5s')
      ])
    ]),

  ]
})
export class JuegoComponent implements OnInit {

  mover = true;
  numPantalla = 0;
  espera:number = 0;
  empezado = false;
  proceso = false;

  miInterval: any;

  actuales:number = 0;
  totales:number = 0;


  constructor(private cookie: CookieService,
    private miService:SesionesService) {
   }

  ngOnInit(): void {
    this.numPantalla = Number(this.cookie.get("Pantalla"))
    this.espera = 4900 * (this.numPantalla-1)

    this.miInterval = setInterval(() => {
      if (this.empezado && !this.proceso){
        this.empezarAnimacion()
        this.proceso = false;
      }
    }, 2000); 
  }

  ngOnDestroy() {
    if (this.miInterval) {
      clearInterval(this.miInterval);
    }
  }

  preguntar(){
    const id = this.cookie.get("Sesion")
    this.miService.preguntar(id).subscribe({
      next: (r) => [
      console.log("Respuesta: " + r.data),
      this.actuales = r.JugadoresActuales[0].JugadoresActuales,
      console.log(this.actuales),
      this.totales = r.JugadoresPermitidos[0].JugadoresPermitidos,
      this.verificar()
    ],
      error: (e) => [console.error(e)],
      complete: () => [console.info('complete')]
  })
  }

  verificar(){
    if (this.actuales == this.totales){
      this.empezado = true;
    }
  }

  empezarAnimacion(){
    console.log("2 seg")
    setTimeout(()=>{ this.mover = false, console.log("2 seg pasads") }, this.espera)
  }

}


