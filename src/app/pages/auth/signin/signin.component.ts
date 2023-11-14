import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  errMsg?: string;

  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmitSignIn(form: NgForm){
    if(form.valid) {
      const { email, password, keepConnection } = form.value;
      this.authService
        .signIn( email, password, keepConnection )
        .then(() => {
          this.router.navigateByUrl('/armor');
        })
        .catch((error: Error) => {
          this.errMsg = error.message;;
        })
    };
  }
}
