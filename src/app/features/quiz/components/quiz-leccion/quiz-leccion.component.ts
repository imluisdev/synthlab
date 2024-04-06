import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILeccion } from '../../../../models/leccion.models';
import { PreguntaService } from '../../../../services/pregunta.service';
import { IPreguntasPorLeccionRequest, IPregunta } from '../../../../models/pregunta.models';

@Component({
  selector: 'app-quiz-leccion',
  templateUrl: './quiz-leccion.component.html',
  styleUrl: './quiz-leccion.component.css'
})
export class QuizLeccionComponent implements OnInit {

  constructor(private location: LocationStrategy,
              private preguntaService: PreguntaService) { }

  public leccion: ILeccion;
  public preguntas: Array<IPregunta>;

  ngOnInit(): void {
    const state: any = this.location.getState();
    this.leccion = state.leccion;
    this.getPreguntasPorLeccion();
  }

  public getPreguntasPorLeccion(){
    const req: IPreguntasPorLeccionRequest = { id_leccion: this.leccion.id }
    this.preguntaService.getPreguntasConOpcionesPorLeccion(req).subscribe((resp: any) => {
      if(resp.status){
        this.preguntas = resp.results;
      }
    });
  }

}
