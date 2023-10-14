import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService, AutResponseData} from "../service/aut.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let authObs: Observable<AutResponseData>;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    form.reset();

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(
      resp => {
        this.isLoading = false;
        this.router.navigate(['/recipes']).then()
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      });
  }
}
