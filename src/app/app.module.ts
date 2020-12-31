import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';


import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { UsersListComponent } from './users/users-list/users-list.component';
import { appRoutes } from './routes';
import { UserCardComponent } from './users/user-card/user-card.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PhotoEditComponent } from './users/photo-edit/photo-edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AttendanceResolver } from './_resolvers/attendance.resolver';
import { AttendanceComponent } from './attendance/attendance.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesResolver } from './_resolvers/courses.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MessagesComponent } from './messages/messages.component';
import { UserMessagesComponent } from './users/user-messages/user-messages.component';
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [				
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    UsersListComponent,
    UserCardComponent,
    UserDetailComponent,
    UserEditComponent,
    PhotoEditComponent,
    AttendanceComponent,
    CoursesComponent,
    MessagesComponent,
    UserMessagesComponent
   ],
  imports: [
    BrowserModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/auth']
      }
    })
  ],
  providers: [AuthService, ErrorInterceptorProvider, UserDetailResolver,
    UserListResolver, UserEditResolver, AttendanceResolver, CoursesResolver, MessagesResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
