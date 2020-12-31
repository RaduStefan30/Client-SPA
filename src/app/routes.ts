import { Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';  
import { MessagesComponent } from './messages/messages.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { AuthGuard } from './_guards/auth.guard';
import { AttendanceResolver } from './_resolvers/attendance.resolver';
import { CoursesResolver } from './_resolvers/courses.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'students', component: UsersListComponent, resolve: { users: UserListResolver } },
      { path: 'students/:id', component: UserDetailComponent, resolve: { user: UserDetailResolver } },
      { path: 'edit', component: UserEditComponent, resolve: { user: UserEditResolver } },
      { path: 'attendance', component: AttendanceComponent, resolve: { attendance: AttendanceResolver } },
      { path: 'messages', component: MessagesComponent, resolve: { messages: MessagesResolver } },
      { path: 'courses', component: CoursesComponent, resolve: { courses: CoursesResolver } }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
