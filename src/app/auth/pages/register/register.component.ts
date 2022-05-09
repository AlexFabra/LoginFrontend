import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {


  form: FormGroup = this.fb.group({
    name: ['antoni', [Validators.required,Validators.minLength(2)]],
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private router:Router) { }

  register() {
    console.log(this.form.value);
    this.router.navigateByUrl('/dashboard');
  }

}
