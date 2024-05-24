import { LocationStrategy } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ILeccion } from '../../../../models/leccion.models';
import { PreguntaService } from '../../../../services/pregunta.service';
import { IPreguntasPorLeccionRequest, IPregunta } from '../../../../models/pregunta.models';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { LeccionService } from '../../../../services/leccion.service';
import { environment } from '../../../../../environments/environment.development';

@Component({
  selector: 'app-quiz-leccion',
  templateUrl: './quiz-leccion.component.html',
  styleUrl: './quiz-leccion.component.css'
})
export class QuizLeccionComponent implements OnInit {

  constructor(private location: LocationStrategy,
              private preguntaService: PreguntaService,
              private router: Router,
              private leccionService: LeccionService,
              private activatedRoute: ActivatedRoute) { }

  public leccion: ILeccion;
  public idLeccionPasada: number;
  public evaluado: boolean = false;
  public preguntas: Array<IPregunta>;
  public abecedario: Array<string>;
  public selectedOptions: Array<any> = [];

  ngOnInit(): void {
    this.abecedario = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r'];
    //const state: any = this.location.getState();
    //this.leccion = state.leccion;
    this.idLeccionPasada = Number(this.activatedRoute.snapshot.paramMap.get('id') || '');
    this.getLessionPassedInfo();
    //this.getPreguntasPorLeccion();
  }

  public getLessionPassedInfo(){
    this.leccionService.obtenerLeccion({ id: this.idLeccionPasada }).subscribe((resp: any) => {
      if(resp.status){
        this.leccion = resp.results;
        this.getPreguntasPorLeccion();
      }
    });
  }

  public getPreguntasPorLeccion(){
    const req: IPreguntasPorLeccionRequest = { id_leccion: this.leccion.id }
    this.preguntaService.getPreguntasConOpcionesPorLeccion(req).subscribe((resp: any) => {
      if(resp.status){
        this.preguntas = resp.results;
      }
    });
  }

  public checkCuantasCorrectas(){
    let contadorCorrectas = 0;
    this.selectedOptions.forEach(item => {
      if(item.es_correcta == 1){
        contadorCorrectas++;
      }
    });
    return contadorCorrectas;
  }

  public evaluarLeccion(){
    if(this.preguntas.length == this.selectedOptions.length){
      this.evaluado = true;
      const valorCadaPregunta = 100 / this.preguntas.length;
      const correctas = this.checkCuantasCorrectas();
      const calificacion = (valorCadaPregunta * correctas).toFixed(2);
      Swal.fire({
        title: "<h1 class='font-bold'>Lección evaluada correctamente!</h1>",
        html: `<h1 class='font-semibold mb-5'>Tu calificación obtenida es de: ${ calificacion }/100</h1>`,
        icon: "success",
        showConfirmButton: false
      });

    } else {
      Swal.fire({
        title: "<h1 class='font-bold'>Respuestas incompletas</h1>",
        html: `<h1 class='font-semibold mb-5'>Por favor contesta todas las preguntas correspondientes a la lección</h1>`,
        icon: "warning",
        showConfirmButton: false
      });
    }
  }

  public goToNextLesson(){
    const nextLessonId = this.leccion.id + 1;

    this.leccionService.obtenerLeccion({ id: nextLessonId }).subscribe((resp: any) => {
      if(resp.status){
        window.location.href = `${environment.mainUrl}/quiz/${nextLessonId}`;
      } else {
        Swal.fire({
          title: "<h1 class='font-bold'>Error en la petición</h1>",
          html: `<h1 class='font-semibold mb-5'>Hubo un error al obtener la lección</h1>`,
          icon: "warning",
          showConfirmButton: false
        });
      }
    });
  }

}
