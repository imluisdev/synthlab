import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ILeccion } from '../../../../models/leccion.models';
import { PreguntaService } from '../../../../services/pregunta.service';
import { IPreguntasPorLeccionRequest, IPregunta } from '../../../../models/pregunta.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-leccion',
  templateUrl: './quiz-leccion.component.html',
  styleUrl: './quiz-leccion.component.css'
})
export class QuizLeccionComponent implements OnInit {

  constructor(private location: LocationStrategy,
              private preguntaService: PreguntaService) { }

  public leccion: ILeccion;
  public evaluado: boolean = false;
  public preguntas: Array<IPregunta>;
  public abecedario: Array<string>;
  public selectedOptions: Array<any> = [];

  ngOnInit(): void {
    this.abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'];
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

  public evaluarLeccion(){
    if(this.preguntas.length == this.selectedOptions.length){
      this.evaluado = true;
    } else {
      Swal.fire({
        title: "<h1 class='font-bold'>Respuestas incompletas</h1>",
        html: `<h1 class='font-semibold mb-5'>Por favor contesta todas las preguntas correspondientes a la lección</h1>`,
        icon: "warning",
        showConfirmButton: false
      });
    }
/*     this.selectedOptions.forEach(item => {
      console.log(item);
    }); */
  }

}
