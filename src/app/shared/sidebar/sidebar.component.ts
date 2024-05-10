import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public currentRoute: string;

  ngOnInit(): void {
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

  public goToRegistrar(){
    this.router.navigate(['/registrar']);
  }

  public detectRouteChanges(){
    this.router.events.subscribe((resp: any) => {
      this.currentRoute = resp.routerEvent?.url;
    })
  }
}
