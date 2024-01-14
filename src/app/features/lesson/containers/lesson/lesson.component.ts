import { Component, OnInit } from '@angular/core';
import { LeccionService } from '../../../../services/leccion.service';
import { register } from 'swiper/element/bundle';
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

  public siguienteLeccion(){
    this.numeroLeccion += 1;
    this.leccion = this.titulos.filter((item:any) => item.id === this.numeroLeccion);
    this.descripciones = this.lecciones.filter((item:any) => item.id_leccion === this.numeroLeccion);
  }

  public cambiarLeccion(id: number){
    this.numeroLeccion == id;
    console.log(this.numeroLeccion);
    this.leccion = this.titulos.filter((item:any) => item.id === this.numeroLeccion);
    this.descripciones = this.lecciones.filter((item:any) => item.id_leccion === this.numeroLeccion);
  }

    constructor(private leccionService: LeccionService){}

    ngOnInit(): void {
      this.leccionService.obtenerTitulos({id:1}).subscribe( (resp:any) => {
        if(resp.status){
          this.titulos = resp.results;
          this.leccion = this.titulos.filter((item:any) => item.id === this.numeroLeccion);
        } else{
          console.log("Error");
        }
      })
      
      this.leccionService.obtenerContenidos({id:1}).subscribe( (resp:any) => {
        if(resp.status){
          this.lecciones = resp.results;
          this.descripciones = this.lecciones.filter((item:any) => item.id_leccion === this.numeroLeccion);
          console.log(this.descripciones);
        } else{
          console.log("Error");
        }
      })
    }
}
