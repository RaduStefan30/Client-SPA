import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Attendance } from '../_models/attendance';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

import { Photo } from '../_models/photo';

import { FileItem, FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendance!: Attendance[];
  pagination!: Pagination;
  editForm!: NgForm;
  newAttendance: any = {};
  maxSize = 5;
  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  public captures: Array<any>;
  url!: string;
  

  constructor(private userService: UserService, private authService: AuthService,
    private route: ActivatedRoute, private alertify: AlertifyService) {
      this.captures = [];
     }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.attendance = data['attendance'].result;
      this.pagination = data['attendance'].pagination;
      
      this.loadAttendance();
    });
  }
  
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAttendance();
  }

  loadAttendance() {
    this.userService.getAttendance(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Attendance[]>) => {
        this.attendance = res.result;
      }, error => {
        this.alertify.error(error);
      })
  }


  // deleteNote(id: number) {
  //   this.alertify.confirm('Are you sure you want to delete this Note?', () => {
  //     this.userService.deleteNote(this.authService.decodedToken.nameid, id).subscribe(() => {
  //       this.notes.splice(this.notes.findIndex(m => m.id === id), 1);
  //       this.alertify.success('Note has been deleted');
  //     }, error => {
  //       this.alertify.error('Failed to delete the note');
  //     });
  //   });
  // }

  takeAttendance() {
    this.userService.takeAttendance(this.authService.decodedToken.nameid, this.newAttendance)
      .subscribe((att: any) => {
        this.attendance.unshift(att);
      }, error => {
        this.alertify.error(error);
      });
  }

    public startCamera() {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                this.video.nativeElement.srcObject = stream;
                this.video.nativeElement.play();
            });
        }
    }

    public capture() {
        var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 480, 320);
        this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
        this.url=this.canvas.nativeElement.toDataURL("image/png");
    }
    
    uploadPhoto(url: string){
      this.userService.uploadPhoto(this.authService.decodedToken.nameid, url)
    .subscribe(url => {
      this.url;
      this.alertify.success('Attendance taken successfully!');
      }, error => {
        this.alertify.error(error);
      });
    }
    }
    
