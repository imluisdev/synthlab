import { Component, OnInit } from '@angular/core';
import { LeccionService } from '../../../../services/leccion.service';
import { Router } from '@angular/router';
import { ILeccion } from '../../../../models/leccion.models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  public lecciones: Array<any>;

  constructor(private leccionService: LeccionService, private router: Router){}

  ngOnInit(): void {
    this.listarLecciones();
  }

  public listarLecciones(){
    this.leccionService.listarLecciones().subscribe((resp: any) => {
      if(resp.status){
        this.lecciones = resp.results;
      }
    });
  }

  public redirectToQuizLeccion(leccion: ILeccion){
    const leccionId = leccion.id;
    this.router.navigate([`quiz/${leccionId}`], { state: { leccion } });
  }

}
