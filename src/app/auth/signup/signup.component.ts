import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;
  // maxDate should ensure that a person has to be at least 18 years old

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date(); // this is today
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); // today's year minus 18, so this gives us today 18 years ago
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
      // in the SignupComponent on the email input we assigned a name of email, for password we assigned a name of password which is why we're able to access the name and password on these names
    });
    // on submit we need to register the user; so we'll reach out to our authService and call the registerUser(), this method expects to get data of type AuthData, which is an object with an email and a password property both holding string values
  }

}
