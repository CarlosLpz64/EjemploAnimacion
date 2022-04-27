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
  esperaTotal:number = 0;
  empezado = false;
  proceso = false;

  miInterval: any;
  miInterval2: any;

  actuales:number = 0;
  totales:number = 0;


  constructor(private cookie: CookieService,
    private miService:SesionesService) {
   }

  ngOnInit(): void {
    this.numPantalla = Number(this.cookie.get("Pantalla"))
    this.espera = 4900 * (this.numPantalla-1)
    this.preguntar()

    this.miInterval = setInterval(() => {
      this.preguntar()
      if (this.empezado && !this.proceso){
        this.empezarAnimacion()
        this.empezarCiclo()
        this.proceso = true;
      }
    }, 2000); 
  }

  empezarCiclo(){
    console.log("Ciclo 2 iniciado")
    this.miInterval = setInterval(() => {
      console.log("ESPERA: " + this.esperaTotal)
      this.empezarAnimacion()
    }, this.esperaTotal); 
  }
  ngOnDestroy() {
    if (this.miInterval) {
      clearInterval(this.miInterval);
    }
    if (this.miInterval2) {
      clearInterval(this.miInterval2);
    }
  }


  preguntar(){
    const id = this.cookie.get("Sesion")
    this.miService.preguntar(id).subscribe({
      next: (r) => [
      console.log("Respuesta: " + r),
      this.actuales = r.JugadoresActuales[0].JugadoresActuales,
      console.log(this.actuales),
      this.totales = r.JugadoresPermitidos[0].JugadoresPermitidos,
      this.esperaTotal = this.totales * 4900,
      this.verificar()
    ],
      error: (e) => [console.error(e)],
      complete: () => [console.info('complete')]
  })
  }

  verificar(){
    if (this.actuales == this.totales){
      console.log("EMPEZANDO PARTIDA")
      this.empezado = true;
    }
  }

  empezarAnimacion(){
    this.mover = true
    setTimeout(()=>{ 
      this.mover = false 
    }, this.espera)
  }

}


