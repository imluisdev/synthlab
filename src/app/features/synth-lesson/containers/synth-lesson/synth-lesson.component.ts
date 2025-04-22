import { Component, OnInit } from '@angular/core';
import { LeccionService } from '../../../../services/leccion.service';
import { register } from 'swiper/element/bundle';
import { ActivatedRoute, Router } from '@angular/router';
import { ILeccion } from '../../../../models/leccion.models';
register();

@Component({
  selector: 'app-synth-lesson',
  templateUrl: './synth-lesson.component.html',
  styleUrl: './synth-lesson.component.css'
})
export class SynthLessonComponent implements OnInit{

  public numeroLeccion: number = 1;
  public numeroDescripcion: number = 1;
  public leccion: any = [];
  public imgLength = 2;
  public titulos: any;
  public lecciones: any;
  public descripciones: any;
  public recursos: any;

  constructor(private leccionService: LeccionService, private router: Router, private activatedRoute: ActivatedRoute){}

  public currentRoute: string;
  
  ngOnInit(): void {
    this.leccionService.obtenerLeccion({id:1}).subscribe( (resp:any) => {
        this.lecciones = resp;
        this.leccion = this.lecciones.find((l: { id: number; }) => l.id === this.numeroLeccion);
        this.descripciones = this.leccion?.contenidos || [];
    })
  }
  
  public siguienteLeccion(){
    this.numeroLeccion += 1;
    
    const siguienteLeccion = this.lecciones.find((l: { id: number; }) => l.id === this.numeroLeccion);
    
    if (siguienteLeccion) {
        this.leccion = siguienteLeccion;
        this.descripciones = this.leccion?.contenidos || [];
    } else {
      //Regresarlo a la primera lección
      this.numeroLeccion = 1;
      this.leccion = this.lecciones.find((l: { id: number; }) => l.id === this.numeroLeccion);
      this.descripciones = this.leccion?.contenidos || [];
    }
}

  public cambiarLeccion(id: number){
    this.numeroLeccion = id;
    this.leccion = this.lecciones.find((l: { id: number; }) => l.id === this.numeroLeccion);
    this.descripciones = this.leccion?.contenidos || [];
  }

  public redirectToQuizLeccion(leccion: ILeccion){
    const leccionId = leccion.id;
    this.router.navigate([`quiz/${leccionId}`], { state: { leccion } });
  }


    public goToDashboard(){
      this.router.navigate(['/dashboard']);
    }

    public detectRouteChanges(){
      this.router.events.subscribe((resp: any) => {
        this.currentRoute = resp.routerEvent?.url;
      })
    }
}
