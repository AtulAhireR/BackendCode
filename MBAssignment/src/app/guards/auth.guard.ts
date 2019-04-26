import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) { }
  
  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('currentUser')) {
      console.log("user present"+sessionStorage.getItem('currentUser'));
      return true;
    }else{
      this.router.navigate(['/']);
      console.log("user null"+sessionStorage.getItem('currentUser'));
      return false;
    }
  };
}
