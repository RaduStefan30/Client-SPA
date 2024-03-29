import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Attendance } from '../_models/attendance';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AttendanceResolver implements Resolve<Attendance[]> {
  pageNumber= 1;
  pageSize=8;

  constructor(private userService: UserService, private router: Router,
    private alertify: AlertifyService, private authService: AuthService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Attendance[]> {
    return this.userService.getAttendance(this.authService.decodedToken.nameid,this.pageNumber, this.pageSize).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);
        return of(null as any);
      })
    );
  }
}
