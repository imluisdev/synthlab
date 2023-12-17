import { Component, OnInit } from '@angular/core';
import { LeccionService } from '../../../../services/leccion.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit{
    constructor(private leccionService: LeccionService){}

    ngOnInit(): void {
      this.leccionService.obtenerLeccion({id:1}).subscribe( resp => {
        console.log(resp);
      })
      
    }
}
