// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

//   onSubmit(form: NgForm) {
//     console.log(form);
//   }

// }



import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
      // in the LoginComponent on the email input we assigned a name of email, for password we assigned a name of password which is why we're able to access the name and password on these names
    });
    // on submit we need to log in the user; so we'll reach out to our authService and call the login(), this method expects to get data of type AuthData, which is an object with an email and a password property both holding string values
  }

}



// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { UiService } from '../../shared/ui.service';
// import { Subscription } from 'rxjs/Subscription';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit, OnDestroy {
//   private loadingSubs: Subscription;
//   public loginForm: FormGroup;
//   public isLoading = false;

//   constructor(private authService: AuthService, private uiService: UiService) {}

//   ngOnInit(): void {
//     this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoadingState: boolean) => {
//       this.isLoading = isLoadingState;
//     });
//     this.loginForm = new FormGroup({
//       email: new FormControl('', {validators: [Validators.required, Validators.email]}),
//       password: new FormControl('', {validators: [Validators.required]})
//     })
//   }

//   ngOnDestroy(): void {
//     if (this.loadingSubs) {
//       this.loadingSubs.unsubscribe();
//     }
//   }

//   public onSubmit(): void {
//     this.authService.login({
//       email: this.loginForm.value.email,
//       password: this.loginForm.value.password
//     });
//   }

// }