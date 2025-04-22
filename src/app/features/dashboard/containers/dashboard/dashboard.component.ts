import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public currentRoute: string;
  public usuario: any;
  public correo: string;

  ngOnInit(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    this.correo = usuario.sub || null;
    this.detectRouteChanges();
  }

  public goToTeoriaMusical(){
    this.router.navigate(['/teoria-musical']);
  }
  
  public goToQuiz(){
    this.router.navigate(['/quiz']);
  }

  public goToSintesisSonora(){
    this.router.navigate(['/sintesis-sonora']);
  }

  public goToSynth(){
    this.router.navigate(['/synth']);
  }

  public detectRouteChanges(){
    this.router.events.subscribe((resp: any) => {
      this.currentRoute = resp.routerEvent?.url;
    })
  }
}
