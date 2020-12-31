import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user!: User;
  registerForm: FormGroup | undefined;
  bsConfig!: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertify: AlertifyService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      firstName: ['', Validators.required],
      year: ['', Validators.required],
      lastName:['', Validators.required],
      faculty:['', Validators.required],
      specialization:['', Validators.required],
      group: ['', Validators.required],
      dateOfBirth:[null, Validators.required]
    });
  }
  register() {
    if (this.registerForm!.valid) {
      this.user = Object.assign({}, this.registerForm!.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration Succesful');
      }, error => {
          this.alertify.error(error);
      }, () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/students']);
          });
      });
    }
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
