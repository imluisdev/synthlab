import { Component, OnInit } from '@angular/core';
import { LeccionService } from '../../../../services/leccion.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  public lecciones: Array<any>;

  constructor(private leccionService: LeccionService){}

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

  public hola(leccion: any){
    console.log(leccion);
  }

}
