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

  imgLength = 1;

  sliderText = [
    "Altura(Pitch): Es la percepción que tenemos de un sonido como agudo o grave. En una partitura...",
    "Viendolo en un piano, entre más a la derecha estén las teclas más agudo sonará y mientras...",
    "Duración: Es la cantidad de tiempo en el que un sonido es reproducido..."
  ]

    constructor(private leccionService: LeccionService){}

    ngOnInit(): void {
      this.leccionService.obtenerLeccion({id:1}).subscribe( resp => {
        console.log(resp);
      })
      
    }
}
