import { Component, OnInit } from '@angular/core';
import { LeccionService } from '../../../../services/leccion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { ILeccion } from '../../../../models/leccion.models';
register();

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit{

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

  public siguienteLeccion(){
    this.numeroLeccion += 1;
    this.leccion = this.titulos.filter((item:any) => item.id === this.numeroLeccion);
    this.descripciones = this.lecciones.filter((item:any) => item.id_leccion === this.numeroLeccion);
  }

  public cambiarLeccion(id: any){
    this.numeroLeccion = id;
    this.leccion = this.titulos.filter((item:any) => item.id === this.numeroLeccion);
    this.descripciones = this.lecciones.filter((item:any) => item.id_leccion === this.numeroLeccion);
  }

  public redirectToQuizLeccion(leccion: ILeccion){
    const leccionId = leccion.id;
    this.router.navigate([`quiz/${leccionId}`], { state: { leccion } });
  }

    ngOnInit(): void {
      this.detectRouteChanges();
      this.leccionService.obtenerTitulos({id:1}).subscribe( (resp:any) => {
        if(resp.status){
          this.titulos = resp.results;
          this.leccion = this.titulos.filter((item:any) => item.id === this.numeroLeccion);
        }
      })
      
      this.leccionService.obtenerContenidos({id:1}).subscribe( (resp:any) => {
        if(resp.status){
          this.lecciones = resp.results;
          this.descripciones = this.lecciones.filter((item:any) => item.id_leccion === this.numeroLeccion);
        }
      })
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
