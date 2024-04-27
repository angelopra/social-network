import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.nnfb.group({
    username: this.nnfb.control('', Validators.required),
    password: this.nnfb.control('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private nnfb: NonNullableFormBuilder,
  ) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value);
    }
  }

  googleLogin() {}
}
