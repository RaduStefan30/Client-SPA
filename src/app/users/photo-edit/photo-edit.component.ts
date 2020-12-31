import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from '../../_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  @Input()
  photos: Photo[] = [];
  @Output() getPhotoChange = new EventEmitter<string>();
  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentPhoto: Photo | undefined;

  loading = false;
  public detectedFaces: any;
  public identifiedPersons = [];
  public personGroups = [];
  public selectedFace: any;
  public selectedGroupId = '';

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.initializeUploader();
  }

    fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + "/photos",
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};
    

    this.uploader.onSuccessItem = (item, response, status, headears) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {  
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);

        console.log(photo.url);
        if (photo.isMain) {
          this.getPhotoChange.emit(photo.url);
        }
      }
    };
  }

  setPhoto(photo: Photo) {
    this.userService.setPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
    this.currentPhoto = this.photos.filter(p => p.isMain === true)[0];
    this.currentPhoto.isMain = false;
    photo.isMain = true;
    this.getPhotoChange.emit(photo.url);
    }, error => {
      this.alertify.error(error);
    });
  }
  deletePhoto(id: number) {
    this.alertify.confirm('Delete Photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('Photo has been deleted.');
      }, error => {
          this.alertify.error("Unable to delete the photo.");
      });
    });
  }
}
