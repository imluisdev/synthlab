import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  public currentRoute: string;

  ngOnInit(): void {
    this.detectRouteChanges();
  }

  public goToHome(){
    this.router.navigate(['/']);
  }

  public goToAbout(){
    this.router.navigate(['/about']);
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
