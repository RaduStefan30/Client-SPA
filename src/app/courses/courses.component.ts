import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../_models/course';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses!: Course[];
  pagination!: Pagination;
  constructor(private userService: UserService, private authService: AuthService,
    private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.courses = data['courses'].result;
      this.pagination = data['courses'].pagination;
      
    this.loadCourses();
    });
  }
  loadCourses() {
    this.userService.getCourses(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Course[]>) => {
        this.courses = res.result;
      }, error => {
        this.alertify.error(error);
      })
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadCourses();
  }

}
