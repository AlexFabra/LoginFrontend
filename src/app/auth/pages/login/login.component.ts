import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  form: FormGroup = this.fb.group({
    email: ['antonino@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  login() {
    if (this.form.valid) {
      this.authService.login(this.form.value.email, this.form.value.password)
        .subscribe(ok => {
          if (ok === true) {
            this.router.navigateByUrl('/dashboard');
          } else {
            //alert('Usuario o contraseña incorrectos');
            Swal.fire('Error', ok, 'error');
          }
        })
    }
  }

}
