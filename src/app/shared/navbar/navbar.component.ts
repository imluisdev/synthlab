import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { SharingService } from '../../services/sharing.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private sharingService: SharingService,
              private authService: AuthService) {}

  public currentRoute: string;
  public userData: any;
  public userData2$: Observable<any>;
  public isLoggedIn$: Observable<boolean>;

  ngOnInit(): void {
    // this.usuarioService.getUsuarioInfo({id_usuario: 1}).subscribe(console.log);
    this.detectRouteChanges();
    this.isLoggedIn$ = this.authService.getSession();
    this.userData2$ = this.sharingService.currentUser;
    this.userData = JSON.parse(localStorage.getItem('usuario') || '{}');
  }

  public logout(){
    /* this.usuarioService.cerrarSesion().subscribe(resp => {

    }); */
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

  public goToFeatures(){
    this.router.navigate(['/features']);
  }

  public goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  public detectRouteChanges(){
    this.router.events.subscribe((resp: any) => {
      this.currentRoute = resp.routerEvent?.url;
    })
  }

}
