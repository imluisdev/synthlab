import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { map } from 'rxjs';

class InjectHelper {

    public authService: AuthService;
    public router: Router;

    constructor(){
        this.authService = inject(AuthService);
        this.router = inject(Router);
    }

}

export const sessionGuard: CanActivateFn = (route, state) => {
    const injectHelper = new InjectHelper();
    return injectHelper.authService.getSession().pipe(
        map((sesion: any) => {
            if(!sesion){
                injectHelper.router.navigate(['/']);
                return false;
            }
            return true;
        })
    );
};